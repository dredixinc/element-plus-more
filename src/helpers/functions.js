export const scrollToElementId = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with ID ${elementId} not found.`);
    }
};

export const getUUID = () => {
    return 'test';
};