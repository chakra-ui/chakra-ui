/** @jsx jsx */
import { css } from "@emotion/core";
import { useTheme } from "../theme";

const statusColors = {
  error: "red",
  warning: "orange",
  info: "blue",
  success: "green"
};

const leftAccentStyle = props => {
  const statusColor = statusColors[props.status];
  const mainColor = props.theme.colors[statusColor][500];

  return css`
    position: relative;
    border-width: 1px;
    [data-alert-icon] {
      color: ${mainColor};
    }
    &:before {
      content: "";
      width: 0.25rem;
      height: 100%;
      position: absolute;
      background-color: ${mainColor};
      left: 0;
      top: 0;
    }
  `;
};

const topAccentStyle = props => {
  const statusColor = statusColors[props.status];
  const mainColor = props.theme.colors[statusColor][500];

  return css`
    position: relative;
    border-width: 1px;
    [data-alert-icon] {
      color: ${mainColor};
    }

    &:before {
      content: "";
      width: 100%;
      height: 0.25rem;
      position: absolute;
      background-color: ${mainColor};
      left: 0;
      top: 0;
    }
  `;
};

const solidStyle = props => {
  const statusColor = statusColors[props.status];
  let mainColor = props.theme.colors[statusColor][500];

  return css({
    backgroundColor: mainColor,
    color: "#fff"
  });
};

const subtleStyle = props => {
  const statusColor = statusColors[props.status];
  return css({
    backgroundColor: props.theme.colors[statusColor][100],
    "[data-alert-icon]": {
      color: props.theme.colors[statusColor][600]
    }
  });
};

const cardStyle = props => {
  return css(leftAccentStyle(props), {
    borderRadius: props.theme.radii.md,
    boxShadow: props.theme.shadows.sm
  });
};

const variantStyle = props => {
  switch (props.variant) {
    case "subtle":
      return subtleStyle(props);
    case "solid":
      return solidStyle(props);
    case "left-accent":
      return leftAccentStyle(props);
    case "top-accent":
      return topAccentStyle(props);
    case "card":
      return cardStyle(props);
    default:
      return {};
  }
};

const rootStyle = props => {
  return css({
    display: "flex",
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "space-between",
    overflow: "hidden",
    padding: "1rem 2.5rem 1rem 1rem"
  });
};

const useAlertStyle = props => {
  const theme = useTheme();
  const _props = { ...props, theme };

  return css`
    ${rootStyle(_props)}
    ${variantStyle(_props)}
  `;
};

export default useAlertStyle;
