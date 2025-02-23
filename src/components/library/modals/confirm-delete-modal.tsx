import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    open,
    onClose,
    onConfirm,
    itemName,
    loading,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby='confirm-delete-title'
            aria-describedby='confirm-delete-description'
            maxWidth='sm'
            fullWidth
        >
            <DialogTitle id='confirm-delete-title'>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography variant='body2'>
                    Are you sure you want to delete{" "}
                    <Typography variant="overline">{itemName}</Typography> ?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='outlined' color='primary'>
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant='contained' color='error' loading={loading}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;
