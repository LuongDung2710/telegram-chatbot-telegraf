export interface ITokenInfo {
    uid: string;
    sid: string;
    aid: string;
    userName: string;
    lastSignedIn: string;
    provider: string;
    verified: boolean;
    cmsu: boolean;
    rpc: boolean;
    twoFA: boolean;
    isInternal: boolean;
    phone?: string;
    email?: string;
    clientId?: string;
    scope?: string[],
    resource_access?: {
        permission: {
            
        }
    },
    isSecondFactorAuthenticated: boolean
}
