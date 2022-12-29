import LoadError from "../organisms/LoadError";

export const NotFound = () => {
    return (
        <LoadError backLink="/" text="Not Found" buttonName="Home" />
    );
};

export default NotFound;
