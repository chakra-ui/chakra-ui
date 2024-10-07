import { createComponent } from "./create-component"

export const GridAnatomy = createComponent((props) => {
  const { palette, ...rest } = props
  return (
    <svg
      width={400}
      height={300}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect
        opacity={0.34}
        x={70}
        y={125}
        width={261}
        height={90}
        fill={palette[3]}
      />
      <rect x={70} y={125} width={81} height={90} fill={palette[2]} />
      <rect x={160} y={125} width={81} height={90} fill={palette[2]} />
      <rect x={250} y={125} width={81} height={90} fill={palette[2]} />
      <rect x={168} y={76} width={63} height={32} rx={10} fill={palette[3]} />
      <path
        d="M187.188 103.167C186.352 103.167 185.632 103.057 185.029 102.838C184.431 102.619 183.942 102.329 183.563 101.968C183.183 101.607 182.9 101.211 182.713 100.782L184.474 100.055C184.598 100.257 184.762 100.469 184.968 100.693C185.178 100.921 185.461 101.116 185.817 101.275C186.178 101.435 186.642 101.515 187.209 101.515C187.986 101.515 188.627 101.326 189.135 100.946C189.642 100.572 189.895 99.9732 189.895 99.1508V97.081H189.765C189.642 97.3049 189.464 97.5539 189.231 97.828C189.002 98.1022 188.687 98.3398 188.285 98.5408C187.883 98.7418 187.36 98.8424 186.715 98.8424C185.884 98.8424 185.134 98.6482 184.467 98.2598C183.805 97.8669 183.279 97.2889 182.891 96.5258C182.507 95.7582 182.315 94.8147 182.315 93.6952C182.315 92.5758 182.505 91.6163 182.884 90.8167C183.268 90.0171 183.793 89.4048 184.46 88.9799C185.128 88.5504 185.884 88.3357 186.729 88.3357C187.382 88.3357 187.91 88.4453 188.312 88.6646C188.714 88.8794 189.027 89.1307 189.251 89.4185C189.48 89.7064 189.656 89.96 189.779 90.1793H189.93V88.4727H191.938V99.233C191.938 100.138 191.728 100.88 191.307 101.46C190.887 102.041 190.318 102.47 189.601 102.749C188.888 103.028 188.084 103.167 187.188 103.167ZM187.168 97.1426C187.757 97.1426 188.255 97.0056 188.662 96.7314C189.073 96.4527 189.384 96.0552 189.594 95.5389C189.809 95.018 189.916 94.3943 189.916 93.6678C189.916 92.9596 189.811 92.3359 189.601 91.7968C189.391 91.2576 189.082 90.8373 188.675 90.5357C188.269 90.2296 187.766 90.0765 187.168 90.0765C186.551 90.0765 186.037 90.2364 185.626 90.5563C185.214 90.8715 184.904 91.301 184.693 91.8447C184.488 92.3885 184.385 92.9962 184.385 93.6678C184.385 94.3578 184.49 94.9632 184.7 95.4841C184.91 96.0049 185.221 96.4116 185.632 96.704C186.048 96.9964 186.56 97.1426 187.168 97.1426ZM194.686 99V88.4727H196.667V90.145H196.777C196.968 89.5785 197.307 89.133 197.791 88.8086C198.28 88.4796 198.833 88.3151 199.449 88.3151C199.577 88.3151 199.728 88.3197 199.902 88.3288C200.08 88.3379 200.219 88.3494 200.32 88.3631V90.3232C200.238 90.3004 200.091 90.2752 199.881 90.2478C199.671 90.2158 199.461 90.1999 199.251 90.1999C198.766 90.1999 198.335 90.3027 197.955 90.5083C197.581 90.7093 197.284 90.9903 197.064 91.3513C196.845 91.7077 196.735 92.1143 196.735 92.5712V99H194.686ZM202.093 99V88.4727H204.143V99H202.093ZM203.128 86.8484C202.772 86.8484 202.466 86.7296 202.21 86.492C201.958 86.2498 201.833 85.962 201.833 85.6284C201.833 85.2903 201.958 85.0025 202.21 84.7649C202.466 84.5227 202.772 84.4016 203.128 84.4016C203.485 84.4016 203.788 84.5227 204.04 84.7649C204.296 85.0025 204.424 85.2903 204.424 85.6284C204.424 85.962 204.296 86.2498 204.04 86.492C203.788 86.7296 203.485 86.8484 203.128 86.8484ZM210.84 99.2056C209.99 99.2056 209.232 98.9886 208.565 98.5545C207.902 98.1159 207.381 97.4922 207.002 96.6835C206.628 95.8701 206.44 94.8946 206.44 93.7569C206.44 92.6192 206.63 91.646 207.009 90.8373C207.393 90.0285 207.918 89.4094 208.585 88.9799C209.253 88.5504 210.009 88.3357 210.854 88.3357C211.507 88.3357 212.033 88.4453 212.43 88.6646C212.832 88.8794 213.143 89.1307 213.362 89.4185C213.586 89.7064 213.76 89.96 213.883 90.1793H214.007V84.9636H216.056V99H214.055V97.362H213.883C213.76 97.5859 213.582 97.8417 213.349 98.1296C213.12 98.4174 212.805 98.6687 212.403 98.8835C212.001 99.0982 211.48 99.2056 210.84 99.2056ZM211.293 97.4579C211.882 97.4579 212.38 97.3026 212.787 96.9919C213.198 96.6766 213.509 96.2402 213.719 95.6828C213.934 95.1254 214.041 94.4766 214.041 93.7364C214.041 93.0053 213.936 92.3656 213.726 91.8173C213.516 91.269 213.207 90.8418 212.8 90.5357C212.394 90.2296 211.891 90.0765 211.293 90.0765C210.676 90.0765 210.162 90.2364 209.751 90.5563C209.339 90.8761 209.029 91.3124 208.818 91.8653C208.613 92.4182 208.51 93.0419 208.51 93.7364C208.51 94.44 208.615 95.0728 208.825 95.6348C209.035 96.1968 209.346 96.6423 209.757 96.9713C210.173 97.2957 210.685 97.4579 211.293 97.4579Z"
        fill={palette[15]}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M151 126L159 133L159.659 132.248L151.659 125.248L151 126ZM151 135L159 142L159.659 141.248L151.659 134.248L151 135ZM159 151L151 144L151.659 143.248L159.659 150.248L159 151ZM151 153L159 160L159.659 159.248L151.659 152.248L151 153ZM159 169L151 162L151.659 161.248L159.659 168.248L159 169ZM151 171L159 178L159.659 177.248L151.659 170.248L151 171ZM159 187L151 180L151.659 179.248L159.659 186.248L159 187ZM151 189L159 196L159.659 195.248L151.659 188.248L151 189ZM159 205L151 198L151.659 197.248L159.659 204.248L159 205ZM151 207L159 214L159.659 213.248L151.659 206.248L151 207ZM249 133L241 126L241.659 125.248L249.659 132.248L249 133ZM241 135L249 142L249.659 141.248L241.659 134.248L241 135ZM249 151L241 144L241.659 143.248L249.659 150.248L249 151ZM241 153L249 160L249.659 159.248L241.659 152.248L241 153ZM249 169L241 162L241.659 161.248L249.659 168.248L249 169ZM241 171L249 178L249.659 177.248L241.659 170.248L241 171ZM249 187L241 180L241.659 179.248L249.659 186.248L249 187ZM241 189L249 196L249.659 195.248L241.659 188.248L241 189ZM249 205L241 198L241.659 197.248L249.659 204.248L249 205ZM241 207L249 214L249.659 213.248L241.659 206.248L241 207Z"
        fill={palette[3]}
      />
    </svg>
  )
})