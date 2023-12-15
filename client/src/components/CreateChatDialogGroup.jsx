import React from 'react';
import { Box, TextField, Stack } from "@mui/material";
import AvatarPhotoUpload from './AvatarPhotoUpload.jsx';

function CreateChatDialogGroup({handleFileChange, imgSrc, input, setInput}) {

  const handleChange = (e)=> {
    const value = e.target.value;
    setInput(value)
  }

  return (
    <>
        <Stack direction="column" gap={2}>
            <Box sx={{margin: "auto"}}>
                <AvatarPhotoUpload group={true} src={imgSrc} onChange={handleFileChange} size={100} />
            </Box>
            <Box sx={{mb: 1}}>
                <TextField fullWidth name="groupName" placeholder='Name your group' value={input} onChange={handleChange}/>
            </Box>
        </Stack>
    </>
  )
}

export default CreateChatDialogGroup