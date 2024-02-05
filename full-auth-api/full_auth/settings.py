from os import getenv, path
from pathlib import Path
import dotenv
from django.core.management.utils import get_random_secret_key
import dj_database_url
import sys
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = BASE_DIR / '.env.local'

# Using pathlib's exists() method to check if the file exists
if path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)
    
DEVELOPMENT_MODE = getenv("DEVELOPMENT_MODE", "False") == "True"
STRIPE_SECRET_KEY = getenv('STRIPE_SECRET_KEY')
STRIPE_PUBLISHABLE_KEY = getenv('STRIPE_PUBLISHABLE_KEY')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = getenv('DJANGO_SECRET_KEY', get_random_secret_key())

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = getenv('DEBUG', 'FALSE') == 'True'

ALLOWED_HOSTS = getenv('DJANGO_ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')

STRIPE_SECRET_KEY = getenv('STRIPE_SECRET_KEY')
STRIPE_PUBLISHABLE_KEY = getenv('STRIPE_PUBLISHABLE_KEY')

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'djoser',
    'storages',
    'social_django',
    'users',
    'ecommerce',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'full_auth.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'full_auth.wsgi.application'

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1), 
}

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases


if DEVELOPMENT_MODE is True:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
elif len(sys.argv) > 0 and sys.argv[1] != 'collectstatic':
    if getenv("DATABASE_URL", None) is None:
        raise Exception("DATABASE_URL environment variable not defined")
    DATABASES = {
        "default": dj_database_url.parse(getenv("DATABASE_URL")),
    }

# EMAIL SETTINGS
EMAIL_BACKEND = 'django_ses.SESBackend'
DEFAULT_FROM_EMAIL = getenv("AWS_SES_FROM_EMAIL")

AWS_SES_REGION_NAME = getenv("AWS_SES_REGION_NAME")
AWS_SES_REGION_ENDPOINT = f"email.{AWS_SES_REGION_NAME}.amazonaws.com"
AWS_SES_ACCESS_KEY_ID = getenv("AWS_SES_ACCESS_KEY_ID")
AWS_SES_SECRET_ACCESS_KEY = getenv("AWS_SES_SECRET_ACCESS_KEY")
AWS_SES_FROM_EMAIL = getenv("AWS_SES_FROM_EMAIL")
USE_SES_V2 = True


DOMAIN = getenv("DOMAIN")
SITE_NAME = "Full Auth"

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/
if DEVELOPMENT_MODE is True:
    STATIC_URL = 'static/'
    STATIC_ROOT = BASE_DIR / 'static'
    MEDIA_URL = 'media/'
    MEDIA_ROOT = BASE_DIR / 'media'
else:
    AWS_S3_ACCESS_KEY_ID = getenv('AWS_S3_ACCESS_KEY_ID')
    AWS_S3_SECRET_ACCESS_KEY = getenv('AWS_S3_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = getenv('AWS_S3_REGION_NAME')
    AWS_S3_ENDPOINT_URL = f'https://{AWS_S3_REGION_NAME}.digitaloceanspaces.com'
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400'
    }
    AWS_DEFAULT_ACL = 'public-read'
    AWS_LOCATION = 'static'
    AWS_S3_CUSTOM_DOMAIN = getenv('AWS_S3_CUSTOM_DOMAIN')
    STORAGES = {
    "default": { "BACKEND": "storages.backends.s3.S3Storage"},
    "staticfiles":{ "BACKEND": "storages.backends.s3.S3Storage"},
}
    
AUTHENTICATION_BACKENDS = [
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'users.authentication.CustomJWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ]
}

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'password-reset/{uid}/{token}',
    'ACTIVATION_URL': 'activation/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'TOKEN_MODEL': None,
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': getenv('REDIRECT_URLS').split(',')
}
AUTH_COOKIE = 'access'
AUTH_COOKIE_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_SECURE = True
AUTH_COOKIE_HTTP_ONLY = True
AUTH_COOKIE_PATH = '/'
AUTH_COOKIE_SAMESITE = 'None'

# GOOGLE
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = getenv('GOOGLE_AUTH_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = getenv('GOOGLE_AUTH_SECRET_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid'
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first_name', 'last_name']

# FACEBOOK
SOCIAL_AUTH_FACEBOOK_KEY = getenv('FACEBOOK_AUTH_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET = getenv('FACEBOOK_AUTH_SECRET_KEY')
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
    'fields': 'email, first_name, last_name'
}

CORS_ALLOWED_ORIGINS = getenv(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:3000, http://127.0.0.1:3000'
).split(',')
CORS_ALLOWED_CREDENTIALS = True
CORS_ALLOW_CREDENTIALS = True
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTH_USER_MODEL = "users.UserAccount"