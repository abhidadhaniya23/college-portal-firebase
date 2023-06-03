import { Button, Typography } from "@material-tailwind/react";

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  ClipboardDocumentIcon,
  CalculatorIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

interface StudentBoxProps {
  name: string;
  teacher: string;
}

const StudentBox: React.FC<StudentBoxProps> = ({ name, teacher }) => {
  return (
    <Card className="fixed lg:flex md:flex hidden top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Subjects
        </Typography>
      </div>
      <List>
        <ListItem onClick={() => console.log("")}>
          <ListItemPrefix>
            <CalculatorIcon className="h-5 w-5" />
          </ListItemPrefix>
          {name}
        </ListItem>
      </List>
    </Card>
  );
};

export default StudentBox;
