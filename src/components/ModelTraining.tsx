'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';
import { uploadFile, trainLoraModel } from '@/services/falApi';
import { useSubscriptionManagement } from '@/hooks/useSubscription';
import { useAuthContext } from '@/context/AuthContext';

// Costo en créditos para entrenar un modelo
const MODEL_TRAINING_CREDIT_COST = 30;

const ModelTraining = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [triggerWord, setTriggerWord] = useState('');
  const [steps, setSteps] = useState(1000);
  const [createMasks, setCreateMasks] = useState(true);
  const [isStyle, setIsStyle] = useState(false);
  const [trainingResult, setTrainingResult] = useState<any>(null);
  
  const { subscription } = useAuthContext();
  const { consumeCredits, incrementModelsCreated } = useSubscriptionManagement();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset selected files when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to 15 files maximum
      const selectedFiles = filesArray.slice(0, 15);
      setSelectedFiles(selectedFiles);
      
      // Clear previous previews
      previews.forEach(preview => URL.revokeObjectURL(preview));
      
      // Generate previews for new files
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
      
      setError(null);
    }
  };

  const createZipFromFiles = async (files: File[]) => {
    const zip = new JSZip();
    
    // Add each file to the zip
    files.forEach(file => {
      zip.file(file.name, file);
    });
    
    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return new File([zipBlob], 'images.zip', { type: 'application/zip' });
  };

  const handleTraining = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least 4 images for training');
      return;
    }

    if (selectedFiles.length < 4) {
      setError('It is recommended to use at least 4 images for better results');
      return;
    }

    if (!apiKey) {
      setError('Please enter your fal.ai API key');
      return;
    }
    
    // Verificar si hay suficientes créditos disponibles
    if (!subscription || subscription.availableCredits < MODEL_TRAINING_CREDIT_COST) {
      setError(`You need at least ${MODEL_TRAINING_CREDIT_COST} credits to train a model. Please upgrade your subscription.`);
      return;
    }

    try {
      setLoading(true);
      setProgress([]);
      setError(null);
      setTrainingResult(null);
      
      // Consumir créditos
      const creditUsed = await consumeCredits(MODEL_TRAINING_CREDIT_COST);
      if (!creditUsed) {
        throw new Error('Failed to use credits. Please try again.');
      }
      
      // Create a zip file from the selected files
      const zipFile = await createZipFromFiles(selectedFiles);
      
      // Upload the zip file to fal.ai storage
      const zipUrl = await uploadFile(zipFile);
      
      // Train the LoRA model
      const result = await trainLoraModel(
        {
          imagesDataUrl: zipUrl,
          triggerWord: triggerWord || undefined,
          steps,
          createMasks,
          isStyle
        },
        (message) => {
          setProgress(prev => [...prev, message]);
        }
      );
      
      // Incrementar el contador de modelos creados
      await incrementModelsCreated();
      
      setTrainingResult(result);
    } catch (err: any) {
      console.error('Error during training:', err);
      setError(err.message || 'An error occurred during model training. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    previews.forEach(preview => URL.revokeObjectURL(preview));
    setPreviews([]);
    setProgress([]);
    setTrainingResult(null);
    setError(null);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-darkLight p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl text-white font-bold mb-6">Train Your Custom AI Model</h2>
      
      {/* Credit information */}
      <div className="mb-6 p-4 bg-dark/50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-300">Model training cost: <span className="text-primary font-bold">{MODEL_TRAINING_CREDIT_COST} credits</span></p>
            <p className="text-xs text-gray-400 mt-1">Credits will be deducted from your account upon successful training</p>
          </div>
          {subscription && (
            <div className="bg-dark px-4 py-2 rounded-md">
              <p className="text-sm text-gray-300">Available credits: <span className="text-white font-bold">{subscription.availableCredits}</span></p>
            </div>
          )}
        </div>
      </div>
      
      {/* API Key Input */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Your fal.ai API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full bg-dark text-white py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
          placeholder="Enter your fal.ai API key"
        />
        <p className="text-xs text-gray-400 mt-1">This will not be stored or shared</p>
      </div>
      
      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Upload 4-15 Photos (JPEG, PNG)</label>
        <div 
          className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/jpeg,image/png"
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400">Click to select photos or drop them here</p>
            <p className="text-xs text-gray-500 mt-1">For best results, use clear photos with consistent lighting</p>
          </div>
        </div>
      </div>
      
      {/* Preview of selected images */}
      {previews.length > 0 && (
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Selected Images ({previews.length})</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative aspect-square w-full bg-dark rounded-lg overflow-hidden">
                <Image 
                  src={preview} 
                  alt={`Selected image ${index + 1}`} 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Training Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-300 mb-2">Trigger Word (Optional)</label>
          <input
            type="text"
            value={triggerWord}
            onChange={(e) => setTriggerWord(e.target.value)}
            className="w-full bg-dark text-white py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
            placeholder="e.g., portrait, person, style"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Training Steps</label>
          <select
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full bg-dark text-white py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
          >
            <option value={1000}>1000 Steps (Standard)</option>
            <option value={1500}>1500 Steps (Better Quality)</option>
            <option value={2000}>2000 Steps (Best Quality)</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="createMasks"
            checked={createMasks}
            onChange={(e) => setCreateMasks(e.target.checked)}
            className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
          />
          <label htmlFor="createMasks" className="ml-2 text-sm text-gray-300">
            Use face detection (recommended)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isStyle"
            checked={isStyle}
            onChange={(e) => setIsStyle(e.target.checked)}
            className="w-4 h-4 text-primary bg-dark border-gray-600 rounded focus:ring-primary"
          />
          <label htmlFor="isStyle" className="ml-2 text-sm text-gray-300">
            This is a style, not a person
          </label>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200">
          <p>{error}</p>
        </div>
      )}
      
      {/* Training Progress */}
      {progress.length > 0 && !trainingResult && (
        <div className="mb-6 p-4 bg-dark rounded-lg">
          <h3 className="text-white font-medium mb-2">Training Progress</h3>
          <div className="max-h-40 overflow-y-auto text-sm">
            {progress.map((message, index) => (
              <p key={index} className="text-gray-400 py-1 border-b border-gray-800 last:border-0">
                {message}
              </p>
            ))}
          </div>
          <div className="mt-4 w-full bg-gray-800 rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      )}
      
      {/* Training Result */}
      {trainingResult && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-800 rounded-lg">
          <h3 className="text-white font-medium mb-2">Training Complete!</h3>
          <p className="text-green-200 mb-4">
            Your custom model has been successfully trained and is ready to use.
          </p>
          
          <div className="bg-dark p-4 rounded-lg mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Model Information</h4>
            <code className="block bg-black/50 p-3 rounded text-xs text-gray-300 overflow-x-auto">
              {JSON.stringify(trainingResult, null, 2)}
            </code>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              Train Another Model
            </button>
          </div>
        </div>
      )}
      
      {/* Training Button */}
      {!trainingResult && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleTraining}
            disabled={loading || selectedFiles.length === 0 || !apiKey || (subscription?.availableCredits || 0) < MODEL_TRAINING_CREDIT_COST}
            className={`px-6 py-3 bg-primary text-white rounded-lg transition-colors ${
              loading || selectedFiles.length === 0 || !apiKey || (subscription?.availableCredits || 0) < MODEL_TRAINING_CREDIT_COST
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-primary/90'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Training Model...
              </span>
            ) : (
              <>Start Training <span className="ml-1">({MODEL_TRAINING_CREDIT_COST} credits)</span></>
            )}
          </button>
          
          {selectedFiles.length > 0 && (
            <button
              onClick={handleReset}
              disabled={loading}
              className={`px-4 py-3 bg-gray-700 text-white rounded-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
              }`}
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelTraining;
