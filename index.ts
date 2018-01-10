import * as crypto from "crypto";
import * as qs from "querystring";
import * as request from "request-promise-native";

export interface IConfig {
    apiUrl?: string;
    pass: string;
    token: string;
}

export interface ISaveTaskResult {
    taskId?: number;
    noUtarget?: string;
    noWork?: string;
}

export enum EBool {
    No = 0,
    Yes = 1,
}

export enum ESaveTaskParamsPriceType {
    Per1000Signs = 1,
    PerTask = 2,
}

export enum ETaskOrderTargetVisibility {
    All = 1,
    Whitelist = 2,
    Individual = 3,
}

export interface ITaskOrder {
    id?: number;
    public?: EBool;
    title: string;
    description?: string;
    text?: string;
    price: number;
    price_type?: ESaveTaskParamsPriceType;
    uniq?: number;
    whitespaces?: EBool;
    only_stars?: EBool;
    size?: number;
    checksize?: EBool;
    deadline?: string;
    timeline?: string;
    auto_work?: EBool;
    auto_rate?: number;
    auto_reports?: number;
    auto_reports_n?: number;
    auto_level?: number;
    id_category: number;
    multitask?: EBool;
    multicount?: number;
    id_folder?: number;
    target_task?: ETaskOrderTargetVisibility;
    id_target?: number;
    keywords?: string;
    language_from?: number;
    language_to?: number;
}

export interface ISaveTaskParams extends ITaskOrder {
    bwgroup_send?: EBool;
}

export enum ETaskOrderStatus {
    Waiting = 1,
    InProgress = 2,
    Review = 3,
    Done = 4,
    Overdue = 5,
}

export enum EListTasksParamsFilter {
    None = 0,
    OverdueInProgress = 10,
}

export interface IListTasksParams {
    count?: number;
    from?: number;
    id?: number;
    id_user?: number;
    id_folder?: number;
    status?: ETaskOrderStatus;
    filter?: EListTasksParamsFilter;
    target?: ETaskOrderTargetVisibility;
    only_id?: EBool;
}

export enum ETaskOrderType {
    Copyrighting = 1,
    Rewrighting = 2,
    Translation = 3,
    SEO = 4,
}

export enum ETaskOrderLevel {
    Any = 0,
    Beginner = 1,
    Medium = 2,
    High = 3,
}

export interface IListTasksResultItem extends ITaskOrder {
    id_user: number;
    date: number;
    end_date: number;
    id_type: ETaskOrderType;
    id_level: ETaskOrderLevel;
    status: ETaskOrderStatus;
    quick: EBool;
    target: ETaskOrderTargetVisibility;
}

export class EtxtApi {
    private apiUrl = "https://www.etxt.biz/api/json/";
    private pass: string;
    private token: string;

    constructor(config: IConfig) {
        this.pass = config.pass;
        this.token = config.token;

        if (config.apiUrl) {
            this.apiUrl = config.apiUrl;
        }
    }

    public saveTask(params: ISaveTaskParams): Promise<ISaveTaskResult> {
        return this.query<ISaveTaskResult>("tasks.saveTask", params);
    }

    public listTasks(params?: IListTasksParams): Promise<IListTasksResultItem[]> {
        return this.query<IListTasksResultItem[]>("tasks.listTasks", params);
    }

    protected query<T>(methodName: string, params?: {}): Promise<T> {
        return request.post(this.getRequestUrl(methodName, params), { body: qs.stringify(params) });
    }

    protected getSignature(method: string, params?: {}): string {
        const hash1 = crypto.createHash("md5");
        const hash2 = crypto.createHash("md5");
        const passHash = hash2.update(this.pass + "api-pass").digest("hex");

        return hash1.update(`method=${method}token=${this.token}` + passHash).digest("hex");
    }

    protected getRequestUrl(method: string, params?: {}): string {
        const signature = this.getSignature(method, params);
        return this.apiUrl + `?token=${this.token}&method=${method}&sign=${signature}`;
    }
}
