import React from "react";

function useFileUpload(initialURL = null) {
    const [file, setFile] = React.useState(null);
    const [url, setUrl] = React.useState(initialURL);

    const fileRef = React.useRef(null);

    const handleFileChange = (e) => {
        const fileObj = e.target.files[0];

        if (fileObj) {
            const objUrl = URL.createObjectURL(fileObj);
            fileRef.current = objUrl;
            setUrl(objUrl);
            setFile(fileObj);
        }
        
        e.target.value = "";
    };
 
    const clearFileUpload = () => {
        setFile(null);
        setUrl(null);
        URL.revokeObjectURL(fileRef.current);
    }

    React.useEffect(() => {
        const fileToRevoke = fileRef.current;

        return () => {
            if (fileToRevoke) {
                URL.revokeObjectURL(fileToRevoke)
            };
        };
    }, []);

    return {
        url,
        setUrl,
        file,
        handleFileChange,
        clearFileUpload,
    };
}

export default useFileUpload;