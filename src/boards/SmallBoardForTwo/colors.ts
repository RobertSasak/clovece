import { Color } from "../../types";

export function getColor(playerColor: Color, light: boolean = false) {
  switch (playerColor) {
    case Color.Red:
      return light ? '#ff8080' : '#bf202f';

    case Color.Green:
      return light ? '#29b376' : '#006f3c';

    case Color.Blue:
      return light ? '#8080ff' : '#274b96';

    case Color.Yellow:
      return light ? '#ffff80' : '#faa73e';
  }
}