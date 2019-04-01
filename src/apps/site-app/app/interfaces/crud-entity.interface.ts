export interface ICrudEntity {
    id: string;
}

export interface ICrudListEntity<TEntity> {
    items: TEntity[];
    count: number;
}