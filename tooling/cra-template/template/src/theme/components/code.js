import Badge, { BadgeVariants } from './badge';

const Code = {
  defaultProps: Badge.defaultProps,
  baseStyle: {
    fontFamily: 'mono',
    fontSize: 'sm',
    paddingX: '0.2em',
    borderRadius: 'sm',
  },
  variants: Badge.variants,
};

export const CodeVariants = BadgeVariants;

export default Code;
