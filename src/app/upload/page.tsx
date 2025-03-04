'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UploadPage = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...fileArray].slice(0, 15));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length < 10) {
      alert('Please upload at least 10 photos');
      return;
    }

    setUploading(true);

    // Simulate upload progress
    let uploadProgress = 0;
    const uploadInterval = setInterval(() => {
      uploadProgress += 5;
      setProgress(uploadProgress);
      
      if (uploadProgress >= 100) {
        clearInterval(uploadInterval);
        setUploading(false);
        setTraining(true);
        
        // Simulate model training (about 10 min in a real app)
        // Here we're making it faster for demo purposes
        setTimeout(() => {
          // In a real app, this would call the fal.ai API with the flux model
          console.log('Model training completed');
          router.push('/dashboard');
        }, 5000);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-darkLight rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-white mb-2 text-center">Upload Your Photos</h1>
            
            <p className="text-gray-300 mb-8 text-center">
              Upload 10-15 photos to train your custom AI model. For best results, choose clear photos with good lighting.
            </p>
            
            {training ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-6"></div>
                <h2 className="text-xl font-bold text-white mb-2">Training Your AI Model</h2>
                <p className="text-gray-400">
                  This process usually takes about 10 minutes. We&apos;ll redirect you when it&apos;s ready.
                </p>
              </div>
            ) : (
              <>
                {!uploading ? (
                  <div className="space-y-6">
                    <div 
                      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <input
                        type="file"
                        id="fileInput"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="text-gray-300 font-medium">Click to upload photos or drag and drop</p>
                      <p className="text-gray-500 text-sm mt-1">JPG, PNG or WEBP (Max 15 photos)</p>
                    </div>
                    
                    {files.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white font-medium">Selected Photos ({files.length}/15)</h3>
                          <button
                            onClick={() => setFiles([])}
                            className="text-gray-400 hover:text-white text-sm"
                          >
                            Clear all
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {files.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square bg-dark rounded-lg overflow-hidden">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button
                        onClick={handleUpload}
                        disabled={files.length < 10}
                        className={`${
                          files.length < 10 
                            ? 'bg-gray-700 cursor-not-allowed' 
                            : 'bg-primary hover:bg-primary/90'
                        } text-white font-bold py-3 px-6 rounded-lg transition-all`}
                      >
                        {files.length < 10
                          ? `Upload at least ${10 - files.length} more photo${10 - files.length > 1 ? 's' : ''}`
                          : 'Start Training My AI Model'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <h2 className="text-xl font-bold text-white mb-6">Uploading Your Photos</h2>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400">{progress}% complete</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="mt-8 bg-darkLight rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-white mb-4">Tips for the Best Results</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Include a variety of expressions and angles
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Use well-lit photos with clear visibility of your face
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Avoid group photos - focus on just yourself
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Include a mix of close-ups and full-body shots
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadPage; 