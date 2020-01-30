// import * as React from "react";

// const InputElement = React.forwardRef((props, ref) => {
//   const { size, children, placement = "left", ...rest } = props;

//   const height = inputSizes[size] && inputSizes[size]["height"];
//   const fontSize = inputSizes[size] && inputSizes[size]["fontSize"];
//   const placementProp = { [placement]: "0" };

//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       position="absolute"
//       height={height}
//       width={height}
//       fontSize={fontSize}
//       top="0"
//       zIndex={2}
//       ref={ref}
//       {...placementProp}
//       {...rest}
//     >
//       {children}
//     </Box>
//   );
// });

// InputElement.displayName = "InputElement";

// const InputLeftElement = forwardRef((props, ref) => (
//   <InputElement ref={ref} placement="left" {...props} />
// ));

// InputLeftElement.displayName = "InputLeftElement";

// const InputRightElement = forwardRef((props, ref) => (
//   <InputElement ref={ref} placement="right" {...props} />
// ));

// InputRightElement.displayName = "InputRightElement";

// export { InputLeftElement, InputRightElement };
// export default InputElement;
