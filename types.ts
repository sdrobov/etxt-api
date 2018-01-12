export interface IConfig {
    apiUrl?: string;
    pass: string;
    token: string;
}

export interface ISaveTaskResult {
    id_task?: number;
    error?: "no_utarget" | "no_uwork" | "no_params";
}

export interface ITaskOrder {
    id?: number;
    public?: 0 | 1;
    title: string;
    description?: string;
    text?: string;
    price: number;
    price_type?: 1 | 2;
    uniq?: number;
    whitespaces?: 0 | 1;
    only_stars?: 0 | 1;
    size?: number;
    checksize?: 0 | 1;
    deadline?: string;
    timeline?: string;
    auto_work?: 0 | 1;
    auto_rate?: number;
    auto_reports?: number;
    auto_reports_n?: number;
    auto_level?: number;
    id_category: number;
    multitask?: 0 | 1;
    multicount?: number;
    id_folder?: number;
    target_task?: 1 | 2 | 3;
    id_target?: number;
    keywords?: string;
    language_from?: number;
    language_to?: number;
}

export interface ISaveTaskParams extends ITaskOrder {
    bwgroup_send?: 0 | 1;
}

export interface IListTasksParams {
    count?: number;
    from?: number;
    id?: number;
    id_user?: number;
    id_folder?: number;
    status?: 1 | 2 | 3 | 4 | 5;
    filter?: 0 | 10;
    target?: 1 | 2 | 3;
    only_id?: 0 | 1;
}

export interface IListTasksResultItem extends ITaskOrder {
    id_user: number;
    date: number;
    end_date: number;
    id_type: 1 | 2 | 3 | 4;
    id_level: 0 | 1 | 2 | 3;
    status: 1 | 2 | 3 | 4 | 5;
    quick: 0 | 1;
    target: 1 | 2 | 3;
}

export interface IListCategoriesResult {
    id_category: number;
    id_parent: number;
    name: string;
    keyword: string;
}

export interface IGetTaskResultParams {
    id: number[];
}

export interface IGetTaskResultResult {
    id: number;
    id_task: number;
    id_user: number;
    comment: string;
    date: number;
    date_reset: number;
    status: 0 | 1 | 2;
    check: 0 | 1;
    files: string[];
    per_keywords?: number;
    per_mistakes: number;
    per_antiplagiat: number;
    per_diff?: number;
    auto_check_date: number;
    name: string;
    size: number;
    path: string;
}
