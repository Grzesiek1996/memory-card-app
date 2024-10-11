export type CardImage = {
  image: string;
};

export type CardConfig = CardImage & SelectedCard;

export type SelectedCard = {
  id: string;
  uniqUUID: string;
};
