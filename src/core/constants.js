export const Constants = {
    key: "BbcNews",
    requestErrorMessage: "Bad request",
    validationMessage: "The api key should consist of 32 symbols",
    apiServer: `${clientSettings && clientSettings.API_SERVER || `${window.location.protocol}//${window.location.host}`}`,
    state: "state",
    current: "current"
}