import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAcademicYearAcademicYear extends Schema.CollectionType {
  collectionName: 'academic_years';
  info: {
    singularName: 'academic-year';
    pluralName: 'academic-years';
    displayName: 'Academic Year';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    year: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::academic-year.academic-year',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::academic-year.academic-year',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssignDppToCollegeAssignDppToCollege
  extends Schema.CollectionType {
  collectionName: 'assign_dpp_to_colleges';
  info: {
    singularName: 'assign-dpp-to-college';
    pluralName: 'assign-dpp-to-colleges';
    displayName: 'Assign DPP to College';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    creat_dpps: Attribute.Relation<
      'api::assign-dpp-to-college.assign-dpp-to-college',
      'manyToMany',
      'api::creat-dpp.creat-dpp'
    >;
    college: Attribute.Relation<
      'api::assign-dpp-to-college.assign-dpp-to-college',
      'oneToOne',
      'api::college.college'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assign-dpp-to-college.assign-dpp-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assign-dpp-to-college.assign-dpp-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssignTestAssignTest extends Schema.CollectionType {
  collectionName: 'assign_tests';
  info: {
    singularName: 'assign-test';
    pluralName: 'assign-tests';
    displayName: 'Assign Test';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    create_test: Attribute.Relation<
      'api::assign-test.assign-test',
      'oneToOne',
      'api::create-test.create-test'
    >;
    Assign: Attribute.Boolean;
    colleges: Attribute.Relation<
      'api::assign-test.assign-test',
      'manyToMany',
      'api::college.college'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assign-test.assign-test',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assign-test.assign-test',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssingSelfStudyToCollegeAssingSelfStudyToCollege
  extends Schema.CollectionType {
  collectionName: 'assing_self_study_to_colleges';
  info: {
    singularName: 'assing-self-study-to-college';
    pluralName: 'assing-self-study-to-colleges';
    displayName: 'Assing Self study to College';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    self_studies: Attribute.Relation<
      'api::assing-self-study-to-college.assing-self-study-to-college',
      'manyToMany',
      'api::self-study.self-study'
    >;
    college: Attribute.Relation<
      'api::assing-self-study-to-college.assing-self-study-to-college',
      'oneToOne',
      'api::college.college'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assing-self-study-to-college.assing-self-study-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assing-self-study-to-college.assing-self-study-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChapterChapter extends Schema.CollectionType {
  collectionName: 'chapters';
  info: {
    singularName: 'chapter';
    pluralName: 'chapters';
    displayName: 'Chapter';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    subject: Attribute.Relation<
      'api::chapter.chapter',
      'oneToOne',
      'api::subject.subject'
    >;
    self_studies: Attribute.Relation<
      'api::chapter.chapter',
      'manyToMany',
      'api::self-study.self-study'
    >;
    creat_dpps: Attribute.Relation<
      'api::chapter.chapter',
      'manyToMany',
      'api::creat-dpp.creat-dpp'
    >;
    question_banks: Attribute.Relation<
      'api::chapter.chapter',
      'manyToMany',
      'api::question-bank.question-bank'
    >;
    create_tests: Attribute.Relation<
      'api::chapter.chapter',
      'manyToMany',
      'api::create-test.create-test'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::chapter.chapter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::chapter.chapter',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCityCity extends Schema.CollectionType {
  collectionName: 'cities';
  info: {
    singularName: 'city';
    pluralName: 'cities';
    displayName: 'City';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::city.city', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::city.city', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiClassClass extends Schema.CollectionType {
  collectionName: 'classes';
  info: {
    singularName: 'class';
    pluralName: 'classes';
    displayName: 'Class';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::class.class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::class.class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCollegeCollege extends Schema.CollectionType {
  collectionName: 'colleges';
  info: {
    singularName: 'college';
    pluralName: 'colleges';
    displayName: 'College';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    address: Attribute.String;
    pincode: Attribute.Integer;
    contact_person: Attribute.String;
    contact_number: Attribute.String;
    secoundary_number: Attribute.String;
    email: Attribute.Email;
    user_name: Attribute.String & Attribute.Unique;
    password: Attribute.String;
    city: Attribute.Relation<
      'api::college.college',
      'oneToOne',
      'api::city.city'
    >;
    map_faculty_to_colleges: Attribute.Relation<
      'api::college.college',
      'manyToMany',
      'api::map-faculty-to-college.map-faculty-to-college'
    >;
    assign_tests: Attribute.Relation<
      'api::college.college',
      'manyToMany',
      'api::assign-test.assign-test'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::college.college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::college.college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCreatDppCreatDpp extends Schema.CollectionType {
  collectionName: 'creat_dpps';
  info: {
    singularName: 'creat-dpp';
    pluralName: 'creat-dpps';
    displayName: 'Creat DPP';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    subject: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'oneToOne',
      'api::subject.subject'
    >;
    class: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'oneToOne',
      'api::class.class'
    >;
    chapters: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'manyToMany',
      'api::chapter.chapter'
    >;
    topics: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'manyToMany',
      'api::topic.topic'
    >;
    assign_dpp_to_colleges: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'manyToMany',
      'api::assign-dpp-to-college.assign-dpp-to-college'
    >;
    academic_year: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    material: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::creat-dpp.creat-dpp',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCreateTestCreateTest extends Schema.CollectionType {
  collectionName: 'create_tests';
  info: {
    singularName: 'create-test';
    pluralName: 'create-tests';
    displayName: 'Create Test';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    duration: Attribute.Integer;
    question_banks: Attribute.Relation<
      'api::create-test.create-test',
      'manyToMany',
      'api::question-bank.question-bank'
    >;
    subject: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'api::subject.subject'
    >;
    chapters: Attribute.Relation<
      'api::create-test.create-test',
      'manyToMany',
      'api::chapter.chapter'
    >;
    topics: Attribute.Relation<
      'api::create-test.create-test',
      'manyToMany',
      'api::topic.topic'
    >;
    class: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'api::class.class'
    >;
    academic_year: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    date: Attribute.Date;
    exam_name: Attribute.String;
    exam_type: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'api::exam-type.exam-type'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::create-test.create-test',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExamTypeExamType extends Schema.CollectionType {
  collectionName: 'exam_types';
  info: {
    singularName: 'exam-type';
    pluralName: 'exam-types';
    displayName: 'Exam Type';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::exam-type.exam-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::exam-type.exam-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFacultyFaculty extends Schema.CollectionType {
  collectionName: 'faculties';
  info: {
    singularName: 'faculty';
    pluralName: 'faculties';
    displayName: 'Faculty';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    user_name: Attribute.String & Attribute.Unique;
    email: Attribute.Email;
    password: Attribute.String;
    contact_number: Attribute.String;
    subject: Attribute.Relation<
      'api::faculty.faculty',
      'oneToOne',
      'api::subject.subject'
    >;
    qualification: Attribute.Relation<
      'api::faculty.faculty',
      'oneToOne',
      'api::qualification.qualification'
    >;
    aadhar_number: Attribute.String;
    pan_number: Attribute.String;
    bank_account: Attribute.String & Attribute.Required;
    ifsc_code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::faculty.faculty',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::faculty.faculty',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLevelLevel extends Schema.CollectionType {
  collectionName: 'levels';
  info: {
    singularName: 'level';
    pluralName: 'levels';
    displayName: 'Level';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::level.level',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::level.level',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMapFacultyToCollegeMapFacultyToCollege
  extends Schema.CollectionType {
  collectionName: 'map_faculty_to_colleges';
  info: {
    singularName: 'map-faculty-to-college';
    pluralName: 'map-faculty-to-colleges';
    displayName: 'Map Faculty To College';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    faculty: Attribute.Relation<
      'api::map-faculty-to-college.map-faculty-to-college',
      'oneToOne',
      'api::faculty.faculty'
    >;
    colleges: Attribute.Relation<
      'api::map-faculty-to-college.map-faculty-to-college',
      'manyToMany',
      'api::college.college'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::map-faculty-to-college.map-faculty-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::map-faculty-to-college.map-faculty-to-college',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMapFacultyToSubjectMapFacultyToSubject
  extends Schema.CollectionType {
  collectionName: 'map_faculty_to_subjects';
  info: {
    singularName: 'map-faculty-to-subject';
    pluralName: 'map-faculty-to-subjects';
    displayName: 'Map Faculty To Subject';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    faculty: Attribute.Relation<
      'api::map-faculty-to-subject.map-faculty-to-subject',
      'oneToOne',
      'api::faculty.faculty'
    >;
    subjects: Attribute.Relation<
      'api::map-faculty-to-subject.map-faculty-to-subject',
      'manyToMany',
      'api::subject.subject'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::map-faculty-to-subject.map-faculty-to-subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::map-faculty-to-subject.map-faculty-to-subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQualificationQualification extends Schema.CollectionType {
  collectionName: 'qualifications';
  info: {
    singularName: 'qualification';
    pluralName: 'qualifications';
    displayName: 'Qualification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::qualification.qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::qualification.qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuestionBankQuestionBank extends Schema.CollectionType {
  collectionName: 'question_banks';
  info: {
    singularName: 'question-bank';
    pluralName: 'question-banks';
    displayName: 'Question Bank';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subject: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'api::subject.subject'
    >;
    chapters: Attribute.Relation<
      'api::question-bank.question-bank',
      'manyToMany',
      'api::chapter.chapter'
    >;
    topics: Attribute.Relation<
      'api::question-bank.question-bank',
      'manyToMany',
      'api::topic.topic'
    >;
    class: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'api::class.class'
    >;
    academic_year: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    question: Attribute.Text;
    answer_1: Attribute.String;
    answer_2: Attribute.String;
    answer_3: Attribute.String;
    answer_4: Attribute.String;
    correct_answer: Attribute.String;
    create_tests: Attribute.Relation<
      'api::question-bank.question-bank',
      'manyToMany',
      'api::create-test.create-test'
    >;
    level: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'api::level.level'
    >;
    stream: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'api::stream.stream'
    >;
    answer_5: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question-bank.question-bank',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResultResult extends Schema.CollectionType {
  collectionName: 'results';
  info: {
    singularName: 'result';
    pluralName: 'results';
    displayName: 'Result';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    create_test: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'api::create-test.create-test'
    >;
    student: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'api::student.student'
    >;
    total: Attribute.Integer;
    obtained: Attribute.Integer;
    test_info: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSelfStudySelfStudy extends Schema.CollectionType {
  collectionName: 'self_studies';
  info: {
    singularName: 'self-study';
    pluralName: 'self-studies';
    displayName: 'Self Study';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    subject: Attribute.Relation<
      'api::self-study.self-study',
      'oneToOne',
      'api::subject.subject'
    >;
    class: Attribute.Relation<
      'api::self-study.self-study',
      'oneToOne',
      'api::class.class'
    >;
    chapters: Attribute.Relation<
      'api::self-study.self-study',
      'manyToMany',
      'api::chapter.chapter'
    >;
    topics: Attribute.Relation<
      'api::self-study.self-study',
      'manyToMany',
      'api::topic.topic'
    >;
    assing_self_study_to_colleges: Attribute.Relation<
      'api::self-study.self-study',
      'manyToMany',
      'api::assing-self-study-to-college.assing-self-study-to-college'
    >;
    academic_year: Attribute.Relation<
      'api::self-study.self-study',
      'oneToOne',
      'api::academic-year.academic-year'
    >;
    material: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::self-study.self-study',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::self-study.self-study',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStreamStream extends Schema.CollectionType {
  collectionName: 'streams';
  info: {
    singularName: 'stream';
    pluralName: 'streams';
    displayName: 'Stream';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stream.stream',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stream.stream',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStudentStudent extends Schema.CollectionType {
  collectionName: 'students';
  info: {
    singularName: 'student';
    pluralName: 'students';
    displayName: 'Student';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    roll_number: Attribute.String;
    email: Attribute.String;
    user_name: Attribute.String & Attribute.Unique;
    password: Attribute.Password;
    college: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'api::college.college'
    >;
    class: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'api::class.class'
    >;
    academic_year: Attribute.String;
    contact_number: Attribute.String;
    secoundary_number: Attribute.String;
    stream: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'api::stream.stream'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubjectSubject extends Schema.CollectionType {
  collectionName: 'subjects';
  info: {
    singularName: 'subject';
    pluralName: 'subjects';
    displayName: 'Subject';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    map_faculty_to_subjects: Attribute.Relation<
      'api::subject.subject',
      'manyToMany',
      'api::map-faculty-to-subject.map-faculty-to-subject'
    >;
    class: Attribute.Relation<
      'api::subject.subject',
      'oneToOne',
      'api::class.class'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subject.subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subject.subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTestTest extends Schema.CollectionType {
  collectionName: 'tests';
  info: {
    singularName: 'test';
    pluralName: 'tests';
    displayName: 'Test';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::test.test', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTestResultTestResult extends Schema.CollectionType {
  collectionName: 'test_results';
  info: {
    singularName: 'test-result';
    pluralName: 'test-results';
    displayName: 'Test Result';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    obtained: Attribute.BigInteger;
    rank: Attribute.BigInteger;
    total_marks: Attribute.Integer;
    class: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::class.class'
    >;
    student: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::student.student'
    >;
    subject: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::subject.subject'
    >;
    test: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::test.test'
    >;
    topic: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::topic.topic'
    >;
    college: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'api::college.college'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::test-result.test-result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTopicTopic extends Schema.CollectionType {
  collectionName: 'topics';
  info: {
    singularName: 'topic';
    pluralName: 'topics';
    displayName: 'Topic';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Unique;
    chapter: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'api::chapter.chapter'
    >;
    self_studies: Attribute.Relation<
      'api::topic.topic',
      'manyToMany',
      'api::self-study.self-study'
    >;
    creat_dpps: Attribute.Relation<
      'api::topic.topic',
      'manyToMany',
      'api::creat-dpp.creat-dpp'
    >;
    question_banks: Attribute.Relation<
      'api::topic.topic',
      'manyToMany',
      'api::question-bank.question-bank'
    >;
    create_tests: Attribute.Relation<
      'api::topic.topic',
      'manyToMany',
      'api::create-test.create-test'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::academic-year.academic-year': ApiAcademicYearAcademicYear;
      'api::assign-dpp-to-college.assign-dpp-to-college': ApiAssignDppToCollegeAssignDppToCollege;
      'api::assign-test.assign-test': ApiAssignTestAssignTest;
      'api::assing-self-study-to-college.assing-self-study-to-college': ApiAssingSelfStudyToCollegeAssingSelfStudyToCollege;
      'api::chapter.chapter': ApiChapterChapter;
      'api::city.city': ApiCityCity;
      'api::class.class': ApiClassClass;
      'api::college.college': ApiCollegeCollege;
      'api::creat-dpp.creat-dpp': ApiCreatDppCreatDpp;
      'api::create-test.create-test': ApiCreateTestCreateTest;
      'api::exam-type.exam-type': ApiExamTypeExamType;
      'api::faculty.faculty': ApiFacultyFaculty;
      'api::level.level': ApiLevelLevel;
      'api::map-faculty-to-college.map-faculty-to-college': ApiMapFacultyToCollegeMapFacultyToCollege;
      'api::map-faculty-to-subject.map-faculty-to-subject': ApiMapFacultyToSubjectMapFacultyToSubject;
      'api::qualification.qualification': ApiQualificationQualification;
      'api::question-bank.question-bank': ApiQuestionBankQuestionBank;
      'api::result.result': ApiResultResult;
      'api::self-study.self-study': ApiSelfStudySelfStudy;
      'api::stream.stream': ApiStreamStream;
      'api::student.student': ApiStudentStudent;
      'api::subject.subject': ApiSubjectSubject;
      'api::test.test': ApiTestTest;
      'api::test-result.test-result': ApiTestResultTestResult;
      'api::topic.topic': ApiTopicTopic;
    }
  }
}
