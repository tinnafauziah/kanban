import { Badge } from "@/components/ui/badge";

export const TODO = "TODO";
export const TODO_LABEL = "TO DO";

export const DOING = "DOING";

export const DONE = "DONE";

export const TODO_STATUS = { value: TODO, label: TODO_LABEL };
export const DOING_STATUS = { value: DOING, label: DOING };
export const DONE_STATUS = { value: DONE, label: DONE };

export const STATUSES = [TODO_STATUS, DOING_STATUS, DONE_STATUS];

export const DESIGN = "Design";
export const BACKEND = "Backend";
export const FRONTEND = "Frontend";

export const TEAMS = [DESIGN, BACKEND, FRONTEND];

export const BADGES_TEAM_MAP = {
  [DESIGN]: (
    <Badge key={DESIGN} variant="secondary">
      {DESIGN}
    </Badge>
  ),
  [BACKEND]: (
    <Badge key={BACKEND} variant="success">
      {BACKEND}
    </Badge>
  ),
  [FRONTEND]: (
    <Badge key={FRONTEND} variant="purple">
      {FRONTEND}
    </Badge>
  ),
};
