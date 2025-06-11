import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommadProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommad = ({ open, setOpen }: DashboardCommadProps) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="find a meeting or agent"
      />
      <CommandList>
        <CommandItem>
            Test
        </CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
