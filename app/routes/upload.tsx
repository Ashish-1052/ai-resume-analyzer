import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { type FormEvent, useEffect, useState } from 'react';
import Navbar from '~/components/Navbar';
import FileUploader from '~/components/FileUploader';
import { convertPdfToImage } from '~/lib/pdf2image';
import { generateUUID } from '~/utils';
import { prepareInstructions } from '~/constants';

export const meta = () => ([
  {
    title: 'Resumize | Upload',
    name: 'description', description: 'Description of your account',
  }
])

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/upload');
  }, [navigate])

  const onFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handleAnalyze = async ({ 
    companyName, jobTitle, description, file
   } : {
    companyName: string;
    jobTitle: string;
    description: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText('Uploading file...');

    const uploadFile = await fs.upload([file]);
    if (!uploadFile) setStatusText(`Upload failed.`);
    const imageFile = await convertPdfToImage(file);
    console.log(imageFile);
    if (!imageFile?.file) return setStatusText(`Failed to convert convert pdf to image.`);

    setStatusText('Uploading the image...');
    const uploadedImage = await fs.upload([imageFile.file]);

    if (!uploadedImage) {
      setStatusText(`Failed to convert image image.`);
      return;
    }

    setStatusText('Preparing Data ...')

    const uuid = generateUUID();

    const data = {
      id: uuid,
      companyName,
      jobTitle,
      description,
      resumePath: uploadedImage.path,
      imagePath: uploadedImage.path,
      feedback: '',
    }

    await kv.set(`resume: ${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing ...');

    const feedback = await ai.feedback(
      uploadedImage.path,
      prepareInstructions({ jobTitle, jobDescription: description })
    )

    if (!feedback) return setStatusText('Error: Failed to analyze resume.');

    const feedbackText = typeof feedback.message.content === 'string' ?
      feedback.message.content : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume: ${uuid}`, JSON.stringify(data));

    setStatusText('Analysis Complete, redirecting');

    console.log(data);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (file) {
      formData.append('file', file);
    } else return;
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    handleAnalyze({ companyName, description: jobDescription, jobTitle, file })
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback on you Resume</h1>
          {isProcessing ? (
            <>
              <h1>{statusText}</h1>
              <img
                src="/images/resume-scan.gif"
                className="w-full"
                alt="scanning"
              />
            </>
          ) : (
            <h2>Drop your Resume for your ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">
                  Company Name
                </label>
                <input type="text" id="company-name" name="company-name" placeholder="Enter Your Company Name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">
                  Job Title
                </label>
                <input type="text" id="job-title" name="job-title" placeholder="Enter Your Job Title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">
                  Job Description
                </label>
                <textarea rows={5} id="job-description" name="job-description" placeholder="Enter Your Job Description" />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">
                  Upload
                </label>
                <FileUploader onFileSelect={onFileSelect} />
              </div>

              <button className="primary-button" type="submit">Analyze Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Upload;