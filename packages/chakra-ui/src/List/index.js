/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { Children, Fragment } from "react";
import Box from "../Box";

const unStyled = css`
  margin-top: 0;
  margin-bottom: 0;
  list-style: none !important;
`;

const List = ({
  inline,
  ordered,
  type,
  children,
  styled,
  showDivider,
  spacing,
  ...rest
}) => {
  const setDisplay = () => {
    if (inline) return "inline-block";
    if (ordered || styled) return "list-item";
    return "block";
  };

  return (
    <Box
      as={ordered ? "ol" : "ul"}
      pl={styled ? "40px" : rest.pl || 0}
      mb={styled ? 3 : rest.mb || 0}
      {...styled === false && { css: unStyled }}
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
