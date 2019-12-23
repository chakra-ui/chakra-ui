import React from "react";
import { Flex, Link } from "@chakra-ui/core";

const PaginationLink = props => <Link fontWeight="bold" {...props} />;

export const Pagination = ({ linkComponent, routes = [], route }) => {
  const index = routes.indexOf(route);
  const previous = routes[index - 1];
  const next = routes[index + 1];

  return (
    <Flex justify="space-between">
      {previous && (
        <PaginationLink as={linkComponent} href={previous.path}>
          {previous.label}
        </PaginationLink>
      )}
      {next && (
        <PaginationLink as={linkComponent} href={next.path}>
          {next.label}
        </PaginationLink>
      )}
    </Flex>
  );
};

export default Pagination;
