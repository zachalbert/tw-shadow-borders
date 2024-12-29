import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

// Types for our plugin options
interface BorderShadowOptions {
  /** Enable debug mode to log transformations */
  debug?: boolean;
  /** Custom border widths mapping */
  borderWidths?: Record<string, string>;
  /** Disable specific colors */
  disabledColors?: string[];
}

// Helper function to convert border color to box shadow
const borderToShadow = (
  color: string,
  width: string = "1px"
): Record<string, string> => ({
  "box-shadow": `inset 0 0 0 ${width} ${color}`,
  border: "0 !important",
});

// Create the plugin
const borderShadowPlugin = plugin.withOptions<BorderShadowOptions>(
  (options = {}) => {
    const {
      debug = false,
      borderWidths = {
        DEFAULT: "1px",
        "0": "0px",
        "2": "2px",
        "4": "4px",
        "8": "8px",
      },
      disabledColors = [],
    } = options;

    return ({ addVariant, addUtilities }) => {
      // Add the shadow-borders variant
      addVariant("shadow-borders", ["&.shadow-borders", ".shadow-borders &"]);

      // Create utilities for border colors
      const borderShadowUtilities = Object.entries(colors).reduce<
        Record<string, { [key: string]: string }>
      >((acc, [colorName, colorValue]) => {
        // Skip disabled colors
        if (disabledColors.includes(colorName)) {
          return acc;
        }

        if (typeof colorValue === "object") {
          // Handle nested color objects (like blue: { 500: '#...' })
          Object.entries(colorValue as Record<string, string>).forEach(
            ([shade, hex]) => {
              const className = `.shadow-borders .border-${colorName}-${shade}`;
              acc[className] = borderToShadow(hex);

              if (debug) {
                console.log(`Created shadow utility: ${className}`);
              }
            }
          );
        } else if (typeof colorValue === "string") {
          // Handle flat colors (like white: '#fff')
          const className = `.shadow-borders .border-${colorName}`;
          acc[className] = borderToShadow(colorValue);

          if (debug) {
            console.log(`Created shadow utility: ${className}`);
          }
        }
        return acc;
      }, {});

      // Add utilities for border widths
      Object.entries(borderWidths).forEach(([key, value]) => {
        const selector =
          key === "DEFAULT"
            ? ".shadow-borders .border"
            : `.shadow-borders .border-${key}`;

        borderShadowUtilities[selector] = {
          "box-shadow-width": value,
          border: "0 !important",
        };

        if (debug) {
          console.log(`Created width utility: ${selector}`);
        }
      });

      addUtilities(borderShadowUtilities);
    };
  },
  () => ({
    theme: {
      extend: {
        // Add any theme extensions here if needed
      },
    },
  })
);

export default borderShadowPlugin;
