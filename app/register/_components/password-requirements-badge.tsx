import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

export function PasswordRequirementsBadge() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
          <CircleHelp className="h-4 w-4 mr-1" />
      </TooltipTrigger>
      <TooltipContent side="right" className="w-56">
        <div className="space-y-2">
          <ul className="list-inside space-y-1 text-xs">
            <li>• Mínimo 8 caracteres</li>
            <li>• Máximo 255 caracteres</li>
            <li>• Pelo menos 1 letra maiúscula</li>
            <li>• Pelo menos 1 letra minúscula</li>
            <li>• Pelo menos 1 número</li>
            <li>• Pelo menos 1 símbolo</li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
