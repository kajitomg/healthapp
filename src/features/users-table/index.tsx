import {Box, LinearProgress} from "@mui/material";
import {cn} from "@bem-react/classname";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel
} from "@mui/x-data-grid";
import {IUser} from "../../services/redux/session/reducer.ts";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface UsersTableProps {
  
  waiting?: boolean;
  
  data:IUser[];
  
}

const cnTableLayout = cn('TableLayout')

const UsersTable = (props:UsersTableProps) => {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  const handleDeleteClick = (id: GridRowId) => () => {
  };
  
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' ,width:80},
    {
      field: 'email',
      headerName: 'Email',
      width:250,
      type: 'string',
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width:300,
      type: 'string',
      editable: true,
    },
    {
      field: 'roleId',
      headerName: 'Role',
      width:80,
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
      <Box className={cnTableLayout()}>
        <DataGrid
          columns={columns}
          rows={props.data}
          sx={{
            height:'100%'
          }}
          loading={props.waiting}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          rowSelectionModel={rowSelectionModel}
          slots={{
            loadingOverlay: LinearProgress,
          }}
        />
      </Box>
  );
};

export {UsersTable};