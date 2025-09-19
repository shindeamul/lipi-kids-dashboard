import { GameCategory, CategoryItem, ItemDetail } from '../types/categories';

export const mockCategories: GameCategory[] = [
  {
    id: 20,
    en_name: "Alphabets",
    te_name: "ఆంగ్ల అక్షరాలు",
    hi_name: "वर्णमाला",
    kn_name: "ಅಕ್ಷರಗಳು",
    gu_name: "અક્ષરો",
    image_url: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:34:16.910Z",
    updated_at: "2025-01-15T06:34:16.910Z",
    sort_order: 1,
    play_mode: true,
    allowed_lang: ["en", "te", "hi"]
  },
  {
    id: 21,
    en_name: "Numbers",
    te_name: "సంఖ్యలు",
    hi_name: "संख्या",
    kn_name: "ಸಂಖ್ಯೆಗಳು",
    gu_name: "સંખ્યાઓ",
    image_url: "https://images.pexels.com/photos/1314543/pexels-photo-1314543.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:35:16.910Z",
    updated_at: "2025-01-15T06:35:16.910Z",
    sort_order: 2,
    play_mode: true,
    allowed_lang: ["en", "te", "hi", "kn"]
  },
  {
    id: 22,
    en_name: "Animals",
    te_name: "జంతువులు",
    hi_name: "जानवर",
    kn_name: "ಪ್ರಾಣಿಗಳು",
    gu_name: "પ્રાણીઓ",
    image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:36:16.910Z",
    updated_at: "2025-01-15T06:36:16.910Z",
    sort_order: 3,
    play_mode: true,
    allowed_lang: ["en", "te", "hi", "kn", "gu"]
  },
  {
    id: 23,
    en_name: "Colors",
    te_name: "రంగులు",
    hi_name: "रंग",
    kn_name: "ಬಣ್ಣಗಳು",
    gu_name: "રંગો",
    image_url: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:37:16.910Z",
    updated_at: "2025-01-15T06:37:16.910Z",
    sort_order: 4,
    play_mode: true,
    allowed_lang: ["en", "te", "hi"]
  },
  {
    id: 24,
    en_name: "Fruits",
    te_name: "పండ్లు",
    hi_name: "फल",
    kn_name: "ಹಣ್ಣುಗಳು",
    gu_name: "ફળો",
    image_url: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:38:16.910Z",
    updated_at: "2025-01-15T06:38:16.910Z",
    sort_order: 5,
    play_mode: false,
    allowed_lang: ["en", "te", "hi", "kn"]
  }
];

export const mockCategoryItems: CategoryItem[] = [
  // Alphabets items
  {
    id: 1,
    category_id: 20,
    en_name: "A",
    te_name: "ఎ",
    te_transliteration: "A",
    hi_name: "अ",
    hi_transliteration: "A",
    kn_name: "ಅ",
    kn_transliteration: "A",
    image_url: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:40:16.910Z",
    updated_at: "2025-01-15T06:40:16.910Z",
    explanation: "First letter of the alphabet",
    video_url: "https://example.com/videos/alphabet-a.mp4"
  },
  {
    id: 2,
    category_id: 20,
    en_name: "B",
    te_name: "బి",
    te_transliteration: "B",
    hi_name: "ब",
    hi_transliteration: "B",
    kn_name: "ಬಿ",
    kn_transliteration: "B",
    image_url: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:41:16.910Z",
    updated_at: "2025-01-15T06:41:16.910Z",
    explanation: "Second letter of the alphabet"
  },
  // Animals items
  {
    id: 3,
    category_id: 22,
    en_name: "Cat",
    te_name: "పిల్లి",
    te_transliteration: "Pilli",
    hi_name: "बिल्ली",
    hi_transliteration: "Billi",
    kn_name: "ಬೆಕ್ಕು",
    kn_transliteration: "Bekku",
    gu_name: "બિલાડી",
    gu_transliteration: "Biladi",
    image_url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:42:16.910Z",
    updated_at: "2025-01-15T06:42:16.910Z",
    explanation: "A small domesticated carnivorous mammal",
    video_url: "https://example.com/videos/cat.mp4"
  },
  {
    id: 4,
    category_id: 22,
    en_name: "Dog",
    te_name: "కుక్క",
    te_transliteration: "Kukka",
    hi_name: "कुत्ता",
    hi_transliteration: "Kutta",
    kn_name: "ನಾಯಿ",
    kn_transliteration: "Nayi",
    gu_name: "કૂતરો",
    gu_transliteration: "Kutaro",
    image_url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300",
    created_at: "2025-01-15T06:43:16.910Z",
    updated_at: "2025-01-15T06:43:16.910Z",
    explanation: "A domesticated carnivorous mammal"
  }
];

export const mockItemDetails: ItemDetail[] = [
  {
    item_id: 1,
    en_explanation: "The letter 'A' is the first letter of the English alphabet. It can make different sounds like 'ay' in 'cake' or 'ah' in 'cat'.",
    te_explanation: "'ఎ' అనేది ఆంగ్ల వర్ణమాలలో మొదటి అక్షరం. ఇది వివిధ శబ్దాలను చేయగలదు.",
    video_url: "https://example.com/videos/alphabet-a-detailed.mp4",
    te_transliteration: "A aneedi English varnamalalo modati aksharam"
  },
  {
    item_id: 3,
    en_explanation: "Cats are independent pets that love to play and sleep. They have soft fur and make purring sounds when happy.",
    te_explanation: "పిల్లులు స్వతంత్ర పెంపుడు జంతువులు, అవి ఆట మరియు నిద్రను ఇష్టపడతాయి.",
    video_url: "https://example.com/videos/cat-detailed.mp4",
    te_transliteration: "Pillulu swatantra pempudu jantuvulu"
  }
];

// Mock API functions
export const mockCategoriesAPI = {
  getCategories: async (params: any = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockCategories,
      pagination: {
        next_cursor: null,
        has_more: false,
        total_count: mockCategories.length
      }
    };
  },

  getCategoryItems: async (categoryId: number, params: any = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const items = mockCategoryItems.filter(item => item.category_id === categoryId);
    return {
      success: true,
      data: items,
      pagination: {
        next_cursor: null,
        has_more: false,
        total_count: items.length
      }
    };
  },

  getItemDetails: async (itemId: number) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const details = mockItemDetails.find(detail => detail.item_id === itemId);
    return {
      success: true,
      data: details || null
    };
  },

  createCategory: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      data: { ...data, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    };
  },

  createItem: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: { ...data, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    };
  },

  bulkImport: async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      message: "Bulk import completed successfully",
      imported_count: 25,
      failed_count: 2,
      failed_records: [
        { row: 3, data: { name: "Invalid Item" }, error: "Missing required field" },
        { row: 7, data: { name: "Duplicate Item" }, error: "Item already exists" }
      ]
    };
  }
};