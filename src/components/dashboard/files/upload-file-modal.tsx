import React, { useState } from "react";
import { Box, Modal, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { useDrop } from "react-dnd";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Custom styles for the modal
const modalStyle = {
  position: "absolute" as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// DragAndDropBox component
const DragAndDropBox = ({ handleFileSelect, isOver, drop }: any) => (
  <Box
    ref={drop} // Attach the drop target here
    sx={{
      border: "2px dashed #3f51b5",
      borderRadius: "4px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      marginBottom: "16px",
      backgroundColor: isOver ? "lightgrey" : "inherit",
    }}
  >
    <Typography variant="body2">
      {isOver ? "Drop files here..." : "Drag & Drop files here or Click to Browse"}
    </Typography>
    <input
      type="file"
      multiple
      style={{ display: "none" }}
      onChange={handleFileSelect}
      id="file-upload-input"
    />
    <label htmlFor="file-upload-input">
      <Button variant="contained" component="span" sx={{ marginTop: "8px" }}>
        Browse Files
      </Button>
    </label>
  </Box>
);

// File Upload Modal Component
const UploadFileModal = ({ open, handleClose }: any) => {
  const [files, setFiles] = useState<File[]>([]);

  // Drag-and-drop handling
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Files", // Accept files as draggable items
    drop: (item: any) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Track whether the files are being dragged over the drop target
    }),
  }));

  // Handle file drop
  const handleDrop = (item: any) => {
    const newFiles = item.files;
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Handle file selection (click-to-upload)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  // Handle file upload (simulate API call)
  const handleUpload = () => {
    // Handle your upload API here
    console.log("Files to upload: ", files);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Upload Files
        </Typography>

        {/* Drag-and-drop area */}
        <DragAndDropBox
          ref={drop}
          isOver={isOver}
          handleFileSelect={handleFileSelect}
        />

        {/* File list */}
        {files.length > 0 && (
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} secondary={`${file.size} bytes`} />
              </ListItem>
            ))}
          </List>
        )}

        {/* Upload button */}
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={files.length === 0}
          fullWidth
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

// Wrapping the entire component with DndProvider
const UploadFileModalWithDndProvider = ({ open, handleClose }: any) => (
  <DndProvider backend={HTML5Backend}>
    <UploadFileModal open={open} handleClose={handleClose} />
  </DndProvider>
);

export default UploadFileModalWithDndProvider;
