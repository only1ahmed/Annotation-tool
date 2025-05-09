import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import axios from "axios";
import { EditorView, basicSetup } from "codemirror"
import { json } from "@codemirror/lang-json"
// import { Welcome } from "../welcome/welcome";
import { EditorState } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { auth } from "../config/firebase";
import { redirect } from "react-router";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    // const loggedInUser = !!auth.currentUser;

    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser !== "logged") {
      window.location.href = "/";
    }
  }, []);


  const [url, setUrl] = useState('');
  const [proxyUrl, setProxyUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const encodedUrl = encodeURIComponent(url);
      const response: any = await axios.get(`http://localhost:5000/proxy?url=${encodedUrl}`, {
        responseType: 'text' // Ensures response.data is treated as raw text (HTML)
      });
      // Create a blob URL for the response
      const blob = new Blob([response.data], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      setProxyUrl(blobUrl);
    } catch (error) {
      console.error('Error fetching website:', error);
      alert('Could not fetch the website');
    }

  };
  const handleAnnotationSubmit = () => {
    // Logic for handling annotation submission
    alert('Annotation submitted successfully!');
    console.log('Annotation data submitted.');
    // Access the JSON data
    console.log('Submitting annotation with the following data:', sampleData);

    // Example: Display the JSON data in an alert (optional)
    alert(`Annotation submitted with the following data:\n${JSON.stringify(sampleData, null, 2)}`);
  };
  const sampleData = {
    url: "https://example.com/article/123",
    content: {
      title: "Example Article Title",
      author: "John Doe",
      date: "2025-02-15",
      text: "This is the main content of the article. It contains several paragraphs of text that have been extracted from the original webpage.",
      sections: [
        {
          heading: "Introduction",
          content: "The introduction section of the article provides background information."
        },
        {
          heading: "Main Points",
          content: "This section covers the main points discussed in the article."
        },
        {
          heading: "Conclusion",
          content: "The conclusion summarizes the key takeaways from the article."
        }
      ],
      tags: ["sample", "example", "demonstration"]
    }
  };

  EditorView.theme({
    "&": {
      backgroundColor: "#f5f5f5", // light gray background
      fontSize: "14px",
      fontFamily: "monospace"
    },
    ".cm-content": {
      padding: "10px",
      color: "#333455",
    },
    ".cm-scroller": {
      overflow: "auto",
    }
  })

  useEffect(() => {
    // Initialize CodeMirror JSON editor
    let jsonEditor = null;
    if (typeof window !== 'undefined') {
      jsonEditor = new EditorView({
        parent: document.getElementById("json-editor")!,
        state: EditorState.create({
          doc: JSON.stringify(sampleData, null, 2),
          extensions: [
            basicSetup,
            json(),
            keymap.of(defaultKeymap)
          ]
        })
      });
    }
  }, []);
  // const jsonEditor = new EditorView({
  //   parent: document.getElementById("json-editor")!,
  //   state: EditorState.create({
  //     doc: JSON.stringify(sampleData, null, 2),
  //     extensions: [
  //       basicSetup,
  //       json(),
  //       keymap.of(defaultKeymap)
  //     ]
  //   })
  // });
  return (
    <>
      <div className="header">
        <h1>URL Content Annotation Tool</h1>
        {/* <div className="url-input-container">
          <input type="text" id="url-input" placeholder="Enter URL to annotate..." />
          <button id="load-button">Load</button>
        </div> */}
        <div className="url-input-container">
          <form onSubmit={handleSubmit} className="mb-4 flex">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="flex-grow p-2 border rounded-l-md"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-md cursor-pointer hover:bg-blue-600 transition-colors duration-200"
            >
              View Website
            </button>
          </form>


        </div>
      </div>

      <div className="main-container">
        <div className="website-panel">
          <div className="panel-header">Website Preview</div>
          <div className="website-content" id="website-content">
            {proxyUrl && (
              <iframe
                src={proxyUrl}
                className="w-full h-full border-2"
                title="Proxied Website"
              // style={{ height: '80vh', width: '80vw', border: '2px solid #ccc' }}
              />
            )}
          </div>
        </div>

        <div className="divider"></div>

        <div className="json-panel">
          <div className="panel-header">Extracted Content (JSON)</div>
          <div className="json-content" id="json-editor"></div>
        </div>
      </div>

      <div className="footer">
        <button id="submit-button" onClick={handleAnnotationSubmit}>Submit Annotation</button>
      </div>

      <div className="notification" id="notification">Annotation submitted successfully!</div>


    </>
  );
}