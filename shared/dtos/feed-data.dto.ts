export class FeedDataDto {
    id!: number;
    username!: string;
    createdAt!: string;
    location!: string;
    content!: string;
    avatar!: string;
    images?: string[];
    likes?: number;
    comments?: number;
}