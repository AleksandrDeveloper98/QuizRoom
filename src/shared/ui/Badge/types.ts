export type TBadgeVariant = "green" | "yellow" | "red" | "violet" | 'transparent-gray';

export type TBadgeProps = {
  children: string;
  variant: TBadgeVariant;
};
