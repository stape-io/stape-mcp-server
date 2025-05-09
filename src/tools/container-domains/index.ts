import { createContainerDomain } from "./createContainerDomain";
import { deleteContainerDomain } from "./deleteContainerDomain";
import { getContainerDomain } from "./getContainerDomain";
import { getContainerDomainEntri } from "./getContainerDomainEntri";
import { getContainerDomains } from "./getContainerDomains";
import { revalidateContainerDomain } from "./revalidateContainerDomain";
import { updateContainerDomain } from "./updateContainerDomain";
import { validateContainerDomain } from "./validateContainerDomain";

export const containerDomainsTools = [
  getContainerDomain,
  getContainerDomainEntri,
  getContainerDomains,
  updateContainerDomain,
  validateContainerDomain,
  revalidateContainerDomain,
  createContainerDomain,
  deleteContainerDomain,
];
