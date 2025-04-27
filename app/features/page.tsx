"use client"
import { FileUploadSection } from '@/components/FileUpload';
import React, { useState } from 'react';

export default function FeaturePage() {
    const [files, setFiles] = useState<File[]>([]);
    return (
    
    <FileUploadSection
        value={files}
        onChange={setFiles}
    />
    );
}
