import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useFoldersAccessible, useFoldersTree } from "@/hooks/useFolders";
import { CircularProgress, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

export const FoldersTree = () => {
    const { data: folders, isLoading, error } = useFoldersAccessible();
    const { push } = useRouter();
    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading folders</div>;
    return (
        <Box>
            <SimpleTreeView
                // onItemClick={(_, id) => push(`/dashboard/folders/${id}`)}
                expansionTrigger='iconContainer'
            >
                {folders?.map((folder: any) => (
                    <TreeItem
                        key={folder.id + folder.name}
                        itemId={folder.id}
                        label={
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                                onClick={() =>
                                    push(`/dashboard/folders/${folder.id}`)
                                }
                            >
                                <Typography
                                    variant='body1'
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <FolderIcon />
                                    {folder.name}
                                </Typography>
                                <Typography variant='subtitle2' color='text.secondary' sx={{ fontStyle: "italic" }}>
                                    {folder.groupName
                                        ? `Shared Group: ${folder.groupName}`
                                        : ""}
                                </Typography>
                            </Box>
                        }
                    >
                        {folder.children?.map((child: any) => (
                            <TreeItem
                                key={child.id}
                                itemId={child.id}
                                label={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                        onClick={() =>
                                            push(
                                                `/dashboard/folders/${child.id}`
                                            )
                                        }
                                    >
                                        <FolderIcon />
                                        <Typography variant='body1'>
                                            {child.name}
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            {child.groupName
                                                ? `Shared Group: ${child.groupName}`
                                                : ""}
                                        </Typography>
                                    </Box>
                                }
                            />
                        ))}
                    </TreeItem>
                ))}
            </SimpleTreeView>
        </Box>
    );
};
