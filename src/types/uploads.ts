export type StageUploads = {
  filename: string;
  contentType: string;
};

export type Upload = {
  url: string;
  file: File | null;
  key?: string;
};

export type StageUploadResponse = {
  key: string;
  uploadUrl: string;
  expiresAt: string;
  method: string;
};
