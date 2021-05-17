import { Global, css } from "@emotion/react"

const SearchStyle = () => (
  <Global
    styles={(theme: any) => css`
      .DocSearch--active {
        overflow: hidden !important;
      }

      .DocSearch-Container {
        height: 100vh;
        left: 0;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 200;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.25);
        padding: 1rem;

        @media (min-width: 640px) {
          padding: 1.5rem;
        }

        @media (min-width: 768px) {
          padding: 10vh;
        }

        @media (min-width: 1024px) {
          padding: 12vh;
        }
      }

      .DocSearch-LoadingIndicator svg {
        display: none;
      }

      .DocSearch-LoadingIndicator {
        display: none;
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='9' stroke-width='2' stroke='%23#319795' /%3E%3Cpath d='M3,12a9,9 0 1,0 18,0a9,9 0 1,0 -18,0' stroke-width='2' stroke='%2306b6d4' stroke-dasharray='56.5486677646' stroke-dashoffset='37.6991118431' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-size: 100% 100%;
      }

      .DocSearch-Container--Stalled .DocSearch-LoadingIndicator {
        display: block;
      }

      .DocSearch-Modal {
        margin: 0 auto;
        width: 100%;
        max-width: 47.375rem;
        display: flex;
        flex-direction: column;
        min-height: 0;
        border-radius: 0.75rem;
        box-shadow: ${theme.shadows.lg};
        background: white;

        .chakra-ui-dark & {
          background: ${theme.colors.gray["700"]};
        }
      }

      .DocSearch-SearchBar {
        flex: none;
        border-bottom: 1px solid ${theme.colors.gray["200"]};
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        margin: 0 1.5rem;

        .chakra-ui-dark & {
          border-bottom-color: ${theme.colors.gray["600"]};
        }
      }

      .DocSearch-Form {
        flex: auto;
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .DocSearch-Dropdown {
        flex: auto;
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding: 0 1.5rem 1.5rem;
        overflow: auto;
      }

      .DocSearch-MagnifierLabel {
        flex: none;
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z' stroke='%23319795' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }

      .DocSearch-MagnifierLabel svg {
        display: none;
      }

      .DocSearch-Container--Stalled .DocSearch-MagnifierLabel {
        display: none;
      }

      .DocSearch-Input {
        appearance: none;
        background: transparent;
        height: 4.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: black;
        margin-left: 1rem;
        margin-right: 1rem;
        flex: auto;
        min-width: 0;

        .chakra-ui-dark & {
          color: white;
        }
      }

      .DocSearch-Input:focus {
        outline: 2px dotted transparent;
      }

      .DocSearch-Input::-webkit-search-cancel-button,
      .DocSearch-Input::-webkit-search-decoration,
      .DocSearch-Input::-webkit-search-results-button,
      .DocSearch-Input::-webkit-search-results-decoration {
        display: none;
      }

      .DocSearch-Reset {
        display: none;
      }

      .DocSearch-Reset::before {
        content: "esc";
      }

      .DocSearch-Cancel {
        flex: none;
        font-size: 0;
        border-radius: 0.375rem;
        background-color: ${theme.colors.gray["50"]};
        border: 1px solid ${theme.colors.gray["300"]};
        padding: 0.125rem 0.375rem;

        .chakra-ui-dark & {
          background-color: ${theme.colors.gray["700"]};
          border-color: ${theme.colors.gray["600"]};
        }
      }

      .DocSearch-Cancel::before {
        content: "esc";
        color: ${theme.colors.gray["400"]};
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      .DocSearch-Reset svg {
        display: none;
      }

      .DocSearch-Hit-source {
        line-height: 1.5rem;
        font-weight: 600;
        color: ${theme.colors.gray["600"]};
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        .chakra-ui-dark & {
          color: ${theme.colors.gray["400"]};
        }
      }

      .DocSearch-Hit-Container {
        display: flex;
        align-items: center;
        height: 4rem;
      }

      .DocSearch-Hit-Tree {
        display: none;
      }

      .DocSearch-Hit-icon {
        flex: none;
        margin-right: 0.875rem;
      }

      .DocSearch-Hit-icon path {
        stroke-width: 2px;
        stroke: #71717a;
      }

      .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-icon path {
        stroke: white;
      }

      .DocSearch-Hit-content-wrapper {
        flex: auto;
        display: flex;
        flex-direction: column-reverse;
        min-width: 0;
      }

      .DocSearch-Hit-path {
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 500;
        color: ${theme.colors.gray["500"]};
      }

      .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-path {
        color: ${theme.colors.teal["200"]};
      }

      .DocSearch-Dropdown ul {
        list-style-type: none;
      }

      .DocSearch-Hit-title {
        color: black;
        line-height: 1.5rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-title {
        color: white;
      }

      .DocSearch-Hit-title + .DocSearch-Hit-path {
        margin-bottom: 0.125rem;
      }

      .DocSearch-Hit-action {
        flex: none;
        margin-left: 0.875rem;
      }

      .DocSearch-Hit-action-button {
        display: flex;
      }

      .DocSearch-Hit-action + .DocSearch-Hit-action {
        margin-left: 0.5rem;
      }

      .DocSearch-Hit-action path {
        stroke-width: 2px;
        stroke: #71717a;
      }

      .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-action path {
        stroke: white;
      }

      .DocSearch-Hit > a {
        display: block;
        background: ${theme.colors.gray["50"]};
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        padding: 0 1.25rem 0 1rem;

        .chakra-ui-dark & {
          background: ${theme.colors.gray["600"]};
          * {
            color: white !important;
          }
        }
      }

      .DocSearch-Hit[aria-selected="true"] > a {
        background: ${theme.colors.teal["500"]};
      }

      .DocSearch-Hit + .DocSearch-Hit {
        margin-top: 0.5rem;
      }

      .DocSearch-Hit {
        position: relative;
      }

      .DocSearch-Hit--Child {
        padding-left: 1.75rem;
      }

      .DocSearch-Hit--Child::before,
      .DocSearch-Hit--Child
        + .DocSearch-Hit:not(.DocSearch-Hit--Child)::before {
        content: "";
        position: absolute;
        top: -0.25rem;
        bottom: -0.25rem;
        left: 0.5rem;
        width: 1.25rem;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='200' viewBox='0 0 12 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 1 0 V 200 M 1 100 H 12' stroke='%23a1a1aa' stroke-width='2'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        background-position: center left;
      }

      .DocSearch-Hit--Child:last-child::before,
      .DocSearch-Hit--Child
        + .DocSearch-Hit:not(.DocSearch-Hit--Child)::before {
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='200' viewBox='0 0 12 200' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 1 0 V 89 Q 1 100 12 100' stroke='%23a1a1aa' stroke-width='2'/%3E%3C/svg%3E%0A");
      }

      .DocSearch-Hit:not(.DocSearch-Hit--Child) + .DocSearch-Hit--Child::after {
        content: "";
        position: absolute;
        top: -0.25rem;
        left: 0;
        width: 1.25rem;
        height: 0.25rem;
        background: inherit;
      }

      .DocSearch-Hit--Child
        + .DocSearch-Hit:not(.DocSearch-Hit--Child)::before {
        top: auto;
        bottom: calc(100% + 0.25rem);
        height: calc(100% + 0.25rem);
        background-color: #fff;
        .chakra-ui-dark & {
          background-color: ${theme.colors.gray["700"]};
        }
      }

      .DocSearch-Hits mark {
        background: none;
        color: ${theme.colors.teal["500"]};
      }

      .DocSearch-Hit[aria-selected="true"] mark {
        color: inherit;
        text-decoration: underline;
      }

      .DocSearch-Footer {
        flex: none;
        display: flex;
        justify-content: flex-end;
        margin: 0 1.5rem;
        border-top: 1px solid ${theme.colors.gray["200"]};
        padding: 1.25rem 0;

        .chakra-ui-dark & {
          border-top-color: ${theme.colors.gray["600"]};
        }
      }

      .DocSearch-Commands {
        display: none;
      }

      .DocSearch-Logo a {
        display: flex;
        align-items: center;
        color: #5d6494;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .DocSearch-Logo svg {
        color: ${theme.colors.teal["500"]};
        margin-left: 0.5rem;
      }

      .DocSearch-Label {
        .chakra-ui-dark & {
          opacity: 0.5;
          color: white;
        }
      }

      .DocSearch-Hit--deleting,
      .DocSearch-Hit--favoriting {
        opacity: 0;
        transition: all 250ms linear;
      }

      .DocSearch-NoResults .DocSearch-Screen-Icon {
        display: none;
      }

      .DocSearch-Title {
        font-size: ${theme.fontSizes.lg};
        line-height: 1.2rem;
        margin-bottom: 2.5rem;
      }

      .DocSearch-Title strong {
        color: inherit;
        font-weight: 500;
      }

      .DocSearch-StartScreen,
      .DocSearch-NoResults {
        padding-top: 2.5rem;
        padding-bottom: 1rem;
      }

      .DocSearch-StartScreen .DocSearch-Help {
        font-size: ${theme.fontSizes.md};
        line-height: 1.5rem;
      }

      .DocSearch-NoResults-Prefill-List .DocSearch-Help {
        font-size: ${theme.fontSizes.xs};
        line-height: 1rem;
        letter-spacing: ${theme.letterSpacings.wide};
        text-transform: uppercase;
        font-weight: 600;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${theme.colors.gray["200"]};

        .chakra-ui-dark & {
          border-bottom: 1px solid ${theme.colors.gray["600"]};
        }
      }

      .DocSearch-NoResults-Prefill-List li {
        padding: 0.5rem 0;
        border-bottom: 1px solid ${theme.colors.gray["200"]};
        .chakra-ui-dark & {
          border-bottom: 1px solid ${theme.colors.gray["600"]};
        }
      }

      .DocSearch-NoResults-Prefill-List button {
        font-weight: 500;
        color: ${theme.colors.teal["600"]};
        .chakra-ui-dark & {
          color: ${theme.colors.teal["400"]};
        }
      }

      .DocSearch-NoResults-Prefill-List + .DocSearch-Help {
        font-size: ${theme.fontSizes.sm};
        line-height: 1.25rem;
        margin-top: 1rem;
      }

      .DocSearch-NoResults-Prefill-List + .DocSearch-Help a {
        color: ${theme.colors.teal["600"]};
        font-weight: 500;

        .chakra-ui-dark & {
          color: ${theme.colors.teal["300"]};
        }
      }
    `}
  />
)

export default SearchStyle
