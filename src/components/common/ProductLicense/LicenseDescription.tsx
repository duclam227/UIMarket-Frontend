import React from 'react';

import { BsCheck, BsX } from 'react-icons/bs';

import style from './ProductLicense.module.css';
const LicenseDescription = () => {
  return (
    <>
      <p>
        The DeeX License grants the user an ongoing, non-exclusive, worldwide license to
        utilize the digital work (“Licensed Asset”).
      </p>
      <p>
        You are licensed to use the “Asset” to create unlimited end projects for yourself
        or for your clients.
      </p>
      <strong>Can be used for</strong>
      <ul className={`${style.allowedUnorderedList}`}>
        <li className={`${style.allowedListItem} d-flex align-items-center`}>
          <span>
            <BsCheck size={30} />
          </span>
          Physical or digital end products for sale
        </li>
        <li className={`${style.allowedListItem} d-flex align-items-center`}>
          <span>
            <BsCheck size={30} />
          </span>
          Unlimited physical advertisements for local & global markets
        </li>
        <li className={`${style.allowedListItem} d-flex align-items-center`}>
          <span>
            <BsCheck size={30} />
          </span>
          Digital paid advertisements with unlimited impressions
        </li>
        <li className={`${style.allowedListItem} d-flex align-items-center`}>
          <span>
            <BsCheck size={30} />
          </span>
          Broadcast and streaming
        </li>
      </ul>
      <strong>What you cannot do</strong>
      <ul className={`${style.notAllowedUnorderedList}`}>
        <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
          <span>
            <BsX size={30} />
          </span>
          Resell or sub-license the Asset in a way that is directly competitive with it
        </li>
        <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
          <span>
            <BsX size={30} />
          </span>
          Resell any modification of the Asset on its own
        </li>
        <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
          <span>
            <BsX size={30} />
          </span>
          Make the Asset public or share the Asset in any way that allows others to
          download, extract, or redistribute it as a standalone file
        </li>
        <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
          <span>
            <BsX size={30} />
          </span>
          Falsely represent authorship and/or ownership of the Asset
        </li>
      </ul>
    </>
  );
};

export default LicenseDescription;
