const dictionary = {};

/**
 * Creates an overloaded function to retrieve string values as strings or components
 * @param  {string} code Lang code as created using add()
 * @return {func}        Function that can be called directly or as a JSX Component
 *                       As in:
 *                           const Str = lang('en');
 *                           
 *                           Str('LOGIN'); // Returns a string
 *                           <Str id="LOGIN" /> // Returns a react component
 */
export function lang(code) {
    return (strOrProps, injectedProps = {}) => {
        const isComponent = typeof strOrProps !== 'string';
        const key = isComponent ? (strOrProps.id || strOrProps.string) : strOrProps;
        const props = isComponent ? strOrProps : injectedProps;
        const value = dictionary[code][key];

        return typeof value === 'function' ? value(props) : value;
    };
}

/**
 * Adds a collection of key:value strings to the dictionary
 * @param  {string} code    Language name, code, id, whatever
 * @param  {object} strings { stringId: stringValue }
 * @return {void}
 */
export function add(code, strings) {
    dictionary[code] = Object.assign({}, strings);
}

/**
 * Creates a copy of an already added language and overwrites (some of) its values
 * @param  {string} code    Name of the lang to be copied
 * @param  {string} newcode Name of the resulting lang
 * @param  {object} strings { stringId: stringValue }
 * @return {void}
 */
export function extend(code, newcode, strings) {
    dictionary[newcode] = Object.assign({}, dictionary[code], strings);
}
