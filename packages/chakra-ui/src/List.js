/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, Fragment } from "react";
import { Box } from "./Layout";

const unstyledStyle = css`
  list-style: none !important;
  padding-left: 0 !important;
  margin-top: 0;
  margin-bottom: 0;
`;

const List = ({
  inline,
  ordered,
  type,
  children,
  isStyled,
  showDivider,
  spacing,
  ...rest
}) => {
  const setDisplay = () => {
    if (inline) return "inline-block";
    if (ordered || isStyled) return "list-item";
    return "block";
  };

  return (
    <Box
      css={isStyled === false && unstyledStyle}
      as={ordered ? "ol" : "ul"}
      mb={3}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        let isLastChild = children.length === index + 1;
        let spacingProps =
          inline && !isLastChild ? { mr: spacing } : { mb: spacing };
        return (
          <Fragment>
            <Box
              key={index}
              as="li"
              px={inline ? 2 : 0}
              display={setDisplay()}
              {...!showDivider && spacingProps}
            >
              {child}
            </Box>

            {showDivider && !isLastChild && (
              <Box
                display="inline"
                borderRight="1px"
                borderColor="gray.200"
                size="100%"
                mx={spacing}
              />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

List.propTypes = {
  type: oneOf(["bullet", "number", "none"])
};

export default List;
