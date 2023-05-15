"""moderation

Revision ID: 1a9d5e4a1719
Revises: 3fba41121353
Create Date: 2023-05-02 15:57:29.198742

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a9d5e4a1719'
down_revision = '3fba41121353'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('moderationrequest',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('appid', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('build_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.Column('is_outdated', sa.Boolean(), nullable=False),
    sa.Column('request_type', sa.String(), nullable=False),
    sa.Column('request_data', sa.String(), nullable=True),
    sa.Column('is_new_submission', sa.Boolean(), nullable=False),
    sa.Column('handled_by', sa.Integer(), nullable=True),
    sa.Column('handled_at', sa.DateTime(), nullable=True),
    sa.Column('is_approved', sa.Boolean(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['handled_by'], ['flathubuser.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_moderationrequest_appid'), 'moderationrequest', ['appid'], unique=False)
    op.create_index(op.f('ix_moderationrequest_handled_by'), 'moderationrequest', ['handled_by'], unique=False)
    op.create_index(op.f('ix_moderationrequest_job_id'), 'moderationrequest', ['job_id'], unique=False)
    op.add_column('flathubuser', sa.Column('is_moderator', sa.Boolean(), server_default=sa.text('false'), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('flathubuser', 'is_moderator')
    op.drop_index(op.f('ix_moderationrequest_job_id'), table_name='moderationrequest')
    op.drop_index(op.f('ix_moderationrequest_handled_by'), table_name='moderationrequest')
    op.drop_index(op.f('ix_moderationrequest_appid'), table_name='moderationrequest')
    op.drop_table('moderationrequest')
    # ### end Alembic commands ###