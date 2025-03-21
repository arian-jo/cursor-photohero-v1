import { fal } from "@fal-ai/client";

// Initialize fal.ai client configuration
// Note: In production, you should handle this on the server-side
// for security. This is just for demonstration purposes.
export const initFalApi = (apiKey?: string) => {
  if (apiKey) {
    fal.config({
      credentials: apiKey
    });
  }
};

interface LoraTrainingInput {
  imagesDataUrl: string;
  triggerWord?: string;
  createMasks?: boolean;
  steps?: number;
  isStyle?: boolean;
}

export interface FalFileResponse {
  url: string;
  contentType: string;
  fileName: string;
  fileSize: number;
}

interface LoraTrainingResult {
  diffusersLoraFile: FalFileResponse;
  configFile: FalFileResponse;
  debugPreprocessedOutput?: FalFileResponse;
}

// Function to upload a file to fal.ai storage
export const uploadFile = async (file: File): Promise<string> => {
  try {
    const url = await fal.storage.upload(file);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Function to train a LoRA model with fal.ai
export const trainLoraModel = async (
  input: LoraTrainingInput,
  onProgress?: (message: string) => void
): Promise<LoraTrainingResult> => {
  try {
    const result = await fal.subscribe("fal-ai/flux-lora-fast-training", {
      input: {
        images_data_url: input.imagesDataUrl,
        trigger_word: input.triggerWord,
        create_masks: input.createMasks !== undefined ? input.createMasks : true,
        steps: input.steps || 1000,
        is_style: input.isStyle || false
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && onProgress) {
          update.logs.forEach(log => {
            onProgress(log.message);
          });
        }
      },
    });

    // Ensure the response matches our interface
    return {
      diffusersLoraFile: result.data.diffusers_lora_file as FalFileResponse,
      configFile: result.data.config_file as FalFileResponse,
      debugPreprocessedOutput: result.data.debug_preprocessed_output as FalFileResponse
    };
  } catch (error) {
    console.error("Error training LoRA model:", error);
    throw error;
  }
};

// Function to submit a LoRA training job asynchronously
export const submitLoraTrainingJob = async (
  input: LoraTrainingInput
): Promise<string> => {
  try {
    const result = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
      input: {
        images_data_url: input.imagesDataUrl,
        trigger_word: input.triggerWord,
        create_masks: input.createMasks !== undefined ? input.createMasks : true,
        steps: input.steps || 1000,
        is_style: input.isStyle || false
      }
    });

    return result.request_id;
  } catch (error) {
    console.error("Error submitting LoRA training job:", error);
    throw error;
  }
};

// Function to check the status of a LoRA training job
export const checkLoraTrainingStatus = async (
  requestId: string,
  includeLogs = true
) => {
  try {
    return await fal.queue.status("fal-ai/flux-lora-fast-training", {
      requestId,
      logs: includeLogs
    });
  } catch (error) {
    console.error("Error checking LoRA training status:", error);
    throw error;
  }
};

// Function to get the result of a LoRA training job
export const getLoraTrainingResult = async (
  requestId: string
): Promise<LoraTrainingResult> => {
  try {
    const result = await fal.queue.result("fal-ai/flux-lora-fast-training", {
      requestId
    });

    // Ensure the response matches our interface
    return {
      diffusersLoraFile: result.data.diffusers_lora_file as FalFileResponse,
      configFile: result.data.config_file as FalFileResponse,
      debugPreprocessedOutput: result.data.debug_preprocessed_output as FalFileResponse
    };
  } catch (error) {
    console.error("Error getting LoRA training result:", error);
    throw error;
  }
};
