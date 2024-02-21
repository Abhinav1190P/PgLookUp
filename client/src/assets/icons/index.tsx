import { IconTrash, IconEdit, IconSquarePlus, IconCurrentLocation, IconHome2 } from "@tabler/icons";

export const DeleteIcon = ({ stroke = 1.5, size = 19 }) => {
  return <IconTrash stroke={stroke} size={size} />;
};

export const EditIcon = ({ stroke = 1.5, size = 19 }) => {
  return <IconEdit stroke={stroke} size={size} />;
};

export const AddIcon = ({ stroke = 1.5, size = 19 }) => {
  return <IconSquarePlus stroke={stroke} size={size} />;
};

export const Location = ({ stroke = 1.5, size = 19 }) => {
  return <IconCurrentLocation stroke={stroke} size={size} />;
};

export const HomeIcon = ({ stroke = 1.5, size = 19 }) => {
  return <IconHome2 stroke={stroke} size={size} />;
};


