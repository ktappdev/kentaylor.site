function n(e){if(typeof e=="string")return e;const t=e.id.split("/").pop();return e.slug??t?.replace(/\.[^.]+$/,"")??"default-slug"}export{n as g};
