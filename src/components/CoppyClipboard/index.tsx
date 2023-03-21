import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, TextareaAutosize } from '@mui/material';


export default function CopyClipboard({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,
    }}>
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: '100%' }}
        value={copyText}
        readOnly
      />
      <IconButton
        type="submit"
        aria-label="search"
        onClick={handleCopyClick}
      >
        {isCopied ? (
          <ContentCopyIcon color="disabled" />
        ) : (
          <ContentCopyIcon />
        )}
      </IconButton>
    </div>
  );
}
