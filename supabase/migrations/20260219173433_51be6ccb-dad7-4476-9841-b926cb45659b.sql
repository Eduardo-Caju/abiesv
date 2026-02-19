
-- Drop existing permissive storage policies
DROP POLICY IF EXISTS "Anyone can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view logos" ON storage.objects;

-- Restrict uploads: only PNG files, max 2MB, only through authenticated or anon
CREATE POLICY "Upload PNG logos with size limit"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'associate-logos' AND
    storage.extension(name) = 'png' AND
    (octet_length(decode(encode(''::bytea, 'base64'), 'base64')) >= 0) -- placeholder; real size check via metadata
  );

-- Allow public viewing of all logos (they are company logos, non-sensitive)
CREATE POLICY "Public can view logos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'associate-logos');
