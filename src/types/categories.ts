export interface GameCategory {
  id: number;
  en_name: string;
  te_name?: string;
  hi_name?: string;
  kn_name?: string;
  gu_name?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  sort_order?: number;
  play_mode: boolean;
  allowed_lang: string[];
}

export interface CategoryItem {
  id: number;
  category_id: number;
  en_name?: string;
  te_name?: string;
  te_transliteration?: string;
  hi_name?: string;
  hi_transliteration?: string;
  kn_name?: string;
  kn_transliteration?: string;
  gu_name?: string;
  gu_transliteration?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  explanation?: string;
  video_url?: string;
}

export interface ItemDetail {
  item_id: number;
  en_explanation?: string;
  te_explanation?: string;
  video_url?: string;
  te_transliteration?: string;
}

export interface CreateCategoryRequest {
  en_name: string;
  te_name?: string;
  hi_name?: string;
  kn_name?: string;
  gu_name?: string;
  image_url?: string;
  sort_order?: number;
  play_mode?: boolean;
  allowed_lang: string[];
}

export interface CreateItemRequest {
  category_id: number;
  en_name?: string;
  te_name?: string;
  te_transliteration?: string;
  hi_name?: string;
  hi_transliteration?: string;
  kn_name?: string;
  kn_transliteration?: string;
  gu_name?: string;
  gu_transliteration?: string;
  image_url?: string;
  explanation?: string;
  video_url?: string;
}

export interface CreateItemDetailRequest {
  item_id: number;
  en_explanation?: string;
  te_explanation?: string;
  video_url?: string;
  te_transliteration?: string;
}

export interface BulkImportResponse {
  success: boolean;
  message: string;
  imported_count: number;
  failed_count: number;
  failed_records?: Array<{
    row: number;
    data: any;
    error: string;
  }>;
}