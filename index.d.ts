//==========================================
// Flow types
//==========================================


/**
 * Request state type of a single request
 */
export declare interface RequestState {
    id?: string | number;

    pending: boolean;
    success: boolean;
    failed: boolean;

    successCount: number;
    failureCount: number;

    clean: boolean,

    message?: any;

    autoRemove?: boolean;
    removeOnSuccess?: boolean;
    removeOnFail?: boolean;
}

/**
 * Request actions for turning request states
 */
export declare interface RequestActions {
    success (id: string | number, message?: any): any;
    failed (id: string | number, message?: any): any;
    pending (id: string | number, message?: any): any;
    remove (id: string | number, message?: any): any;

    clean (id: string | number): any;
    dirty (id: string | number): any;
}


export declare function index (shallowWrapper: Object, mockFn: RequestActions);
