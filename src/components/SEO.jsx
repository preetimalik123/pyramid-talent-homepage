import { useEffect } from "react";

const DEFAULT_META = {
  title: "Pyramid Talent | Global Talent Solutions",
  description:
    "Pyramid Talent connects employers and job seekers through contract staffing, direct hire, Teams as a Service, Employer of Record, and industry-specific workforce solutions.",
  canonicalPath: "/",
};

function setMetaTag(name, content, attribute = "name") {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(path) {
  let link = document.head.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", `${window.location.origin}${path}`);
}

export default function SEO({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  canonicalPath = DEFAULT_META.canonicalPath,
}) {
  useEffect(() => {
    document.title = title;

    setMetaTag("description", description);
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setCanonical(canonicalPath);
  }, [title, description, canonicalPath]);

  return null;
}
