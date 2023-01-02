DO
$do$
BEGIN
  IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'user1') THEN

      RAISE NOTICE 'Role "user1" already exists. Skipping.';
   ELSE
       CREATE USER  user1 WITH PASSWORD 'user1';
   END IF;

END
$do$;
