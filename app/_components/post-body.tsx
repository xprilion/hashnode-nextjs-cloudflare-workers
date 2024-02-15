"use client"

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-python.min.js';
import {useEffect} from "react";

type Props = {
  content: any;
};

export function PostBody({ content }: Props) {
    useEffect(() => {
        Prism.highlightAll();
    }, [content]);
    
  return (
    <div className="max-w-2xl mx-auto">
      <div
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </div>
  );
}
