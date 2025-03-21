'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';
import { uploadFile, trainLoraModel } from '@/services/falApi';

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

    try {
      setLoading(true);
      setProgress([]);
      setError(null);
      setTrainingResult(null);
      
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
      
      setTrainingResult(result);
    } catch (err) {
      console.error('Error during training:', err);
      setError('An error occurred during model training. Please try again.');
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
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(parseInt(e.target.value) || 1000)}
            min={500}
            max={2000}
            className="w-full bg-dark text-white py-2 px-3 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="createMasks"
            checked={createMasks}
            onChange={(e) => setCreateMasks(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="createMasks" className="text-gray-300">Create Segmentation Masks</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isStyle"
            checked={isStyle}
            onChange={(e) => setIsStyle(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isStyle" className="text-gray-300">Train as Style LoRA</label>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleTraining}
          disabled={loading || selectedFiles.length === 0 || !apiKey}
          className={`py-3 px-6 rounded-lg font-medium ${
            loading || selectedFiles.length === 0 || !apiKey
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark transition-colors'
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
            'Train Model'
          )}
        </button>
        
        <button
          onClick={handleReset}
          className="py-3 px-6 bg-dark rounded-lg font-medium text-white hover:bg-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-900/50 text-red-300 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Training Progress */}
      {progress.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-medium mb-2">Training Progress</h3>
          <div className="bg-dark p-4 rounded-lg max-h-60 overflow-y-auto text-sm">
            {progress.map((message, index) => (
              <div key={index} className="text-gray-300 mb-1">
                {message}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Training Result */}
      {trainingResult && (
        <div className="mb-6">
          <h3 className="text-white font-medium mb-2">Training Complete!</h3>
          <div className="bg-dark p-4 rounded-lg">
            <div className="mb-4">
              <p className="text-gray-300 mb-2">LoRA Model File:</p>
              <a 
                href={trainingResult.diffusersLoraFile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {trainingResult.diffusersLoraFile.url}
              </a>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-300 mb-2">Config File:</p>
              <a 
                href={trainingResult.configFile.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {trainingResult.configFile.url}
              </a>
            </div>
            
            {trainingResult.debugPreprocessedOutput && (
              <div>
                <p className="text-gray-300 mb-2">Preprocessed Output:</p>
                <a 
                  href={trainingResult.debugPreprocessedOutput.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {trainingResult.debugPreprocessedOutput.url}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelTraining;
